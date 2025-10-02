import { NextRequest, NextResponse } from 'next/server';
import {
  Agent,
  AgentInputItem,
  run,
  tool,
  user,
  withTrace,
  webSearchTool,
  hostedMcpTool,
  MCPServerStdio,
} from '@openai/agents';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Replicate from "replicate";
//import { deepResearchAnything } from '../../../agentActions';
import OpenAI from "openai";
//import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { listIndexesFromPinecone, createIndex, addToIndex, addEmployeeDataToIndex, addTranscriptDataToIndex, semanticSearch } from '../../../../services/pineconeService';
import { INDEX_TYPES } from '../../../../types/metadata';
import { api as convexApi } from "../../../../convex/_generated/api";

import { setDefaultOpenAIKey } from '@openai/agents';
import { setTracingExportApiKey, } from '@openai/agents';
import { RunItem, RunMessageOutputItem } from '@openai/agents';

import { tr } from 'motion/react-client';
setDefaultOpenAIKey(process.env.NODE_ENV === 'production' ? process.env.OPENAI_API_KEY! : process.env.NEXT_PUBLIC_OPENAI_API_KEY!);
setTracingExportApiKey(process.env.NODE_ENV === 'production' ? process.env.OPENAI_API_KEY! : process.env.NEXT_PUBLIC_OPENAI_API_KEY!);

const replicate = new Replicate({
  auth: process.env.NODE_ENV === 'production' ? process.env.REPLICATE_API_KEY! : process.env.NEXT_PUBLIC_REPLICATE_API_KEY!
});

const openai = new OpenAI({
  apiKey: process.env.NODE_ENV === 'production' ? process.env.OPENAI_API_KEY! : process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

// Ensure Node.js runtime for stdio processes
export const runtime = 'nodejs';

// MCP: Sequential Thinking server via hosted service
// Using hostedMcpTool instead of local stdio server for better deployment compatibility
// const sequentialThinkingTool = hostedMcpTool({
//   serverLabel: 'sequential_thinking',
//   //serverUrl: process.env.MCP_SEQUENTIAL_THINKING_URL || 'https://api.mcp-cloud.io/sequential-thinking',
//   serverUrl: process.env.MCP_SEQUENTIAL_THINKING_URL || 'https://glama.ai/mcp/instances/svuec7nlpl/mcp',
//   // Add authorization if needed
//   // authorization: process.env.MCP_AUTH_TOKEN,
// });

/* ------------------------------------------------------------------------------------------------

REVIEW: Types

-------------------------------------------------------------------------------------------------- */

/*
const emailSchema = z.object({
  option1: z.object({
    subject: z.string(),
    body: z.string(),
  }),
  option2: z.object({
    subject: z.string(),
    body: z.string(),
  }),
  option3: z.object({
    subject: z.string(),
    body: z.string(),
  }),
  businessName: z.string(),
  templateUsed: z.string(),
  websiteName: z.string(),
  reasonForUsingTemplate: z.string().describe('The reason for using the template. No longer than 100 words.'),
});
*/


/* ------------------------------------------------------------------------------------------------

REVIEW: Constants

-------------------------------------------------------------------------------------------------- */

const emailTemplates = [
  {
    name: 'Last 10 Jobs → Neighbors',
    description: 'Neighborhood Reactivation campaign targeting neighbors of recent job sites',
    template: `Subject options:
    - Your last 10 jobs = fast new leads
    - Neighbors are 10x more likely to hire you
    - Turn finished work into more jobs this week

      Body:
      Hey [First Name/Company Name],
      Send me your last 10 jobs and I'll launch a Neighborhood Reactivation: we hit the homes around those addresses with a clean postcard design. Neighbors who saw your crew are 10x more likely to call. Approve the proof and we'll have mail out in <5 days.
      Want me to pull the list or do you have it handy?
      – Team DOPE`,
  },

  {
    name: 'No Minimum. Upload & Go.',
    description: 'Flexible campaign with no minimums for quick job list targeting',
    template: `Subject options:
    - No minimum—upload and mail in <5 days
    - Hit any job list fast (10, 20, 50+)
    - Simple way to fill your schedule

    Body:
    Hey [First Name/Company Name],
    Upload your last 10 (or 20, or 50) jobs—no minimums. We'll target the neighbors with postcards and get them out in under 5 days. Warm area, quick turnaround, predictable results.
    Reply "GO" and I'll set it up now.
    – Team DOPE`,
  },

  {
    name: 'Mail Out in <5 Days',
    description: 'Quick turnaround campaign focusing on speed and neighboring areas',
    template: `Subject options:
    - Quick win: more jobs this week
    - Postcards in mailboxes in under 5 days
    - Your next jobs are right next door

    Body:
    Hey [First Name/Company Name],
    You've already done the hard part. Send your recent job addresses, approve a postcard, and we'll mail the neighbors in <5 days. It's fast, affordable, and focuses on the exact neighborhoods you want.
    Ready to launch this week?
    – Team DOPE`,
  },

];
const whoIsDopeMarketing = `
    Who is DOPE Marketing?

    Dope Marketing is a data-driven marketing platform and direct print and mail company specializing in making marketing predictable, data-driven, and friction-free for businesses aiming to grow. Founded by CEO Dave Carroll, the company emerged to simplify direct mail, growing from a software solution to a 100+ person operation with its own 40,000 sq. ft. print facility and a full SaaS platform.

    Their core offering is automated direct mail, which integrates with CRMs for hyperlocal targeting and offers services with no minimum order. Dope Marketing caters primarily to local and home service brands such as roofers, lawn care, pest control, remodelers, HVAC, plumbing, and electrical, but also serves various other industries including real estate, insurance, and restaurants.

    Key features and services include:

    Direct Mail Automation: Sending postcards, handwritten notes, and gifts automatically based on triggers from a business's CRM.

    Neighborhood Blitz: A tool for highly targeted mailings to specific geographic areas or demographics, leveraging CRM data.

    CRM Integrations: Seamlessly connecting with popular CRMs like GoHighLevel, Zapier, Salesforce, and HubSpot to automate marketing efforts.

    In-house Design and Production: They own both the technology and the print shop, ensuring control over every step from design (with a dedicated team and templates) to printing and shipping.

    Print Products: Beyond automated mail, they offer yard signs, door hangers, and business cards.

    No Minimum Orders: Allowing businesses of all sizes to utilize their services.

    Tracking: Providing visibility into campaign performance.

    Dope Marketing differentiates itself through its comprehensive, data-driven approach, owning the entire direct mail process, and its strong focus on helping local and home service businesses achieve measurable ROI. The "DOPE" in their name stands for "Data On Previous Engagement".
`
const dopeVoice = `

DOPE VOICE — Compact Guide (use for every email)

You are Dope Marketing’s senior conversion copywriter. Adopt one consistent voice for every outbound email: direct, pragmatic, and action‑first. About 70% matter‑of‑fact, 30% purposeful founder energy. Short sentences, active verbs, concrete offers, and one clear reply‑based CTA are non‑negotiable.

Core priority: personalization that converts

Use no more than one or two/ specific signals to avoid overload; keep personalization tight and evidence‑based.
Personalization should always support an immediate conversion action (pilot, audit, inspection).
Voice & tone

Direct and assertive; outcome-driven (booked jobs, CPL, lift).
Confident and efficient — professional but energetic; avoid jokes, slang, or personal anecdotes.
Subtle urgency/seasonality allowed when relevant (e.g., “fall leaf load,” “pre‑winter”).
Structure & format (required)

Do not invent facts or attribute actions you haven’t been given. Only use client details the user supplies.
No more than one casual/founder‑energy phrase per email and only if it aids clarity.
`
const howToGenerateAProsal = `

  HOW TO GENERATE A PROPOSAL:

  First, if you are given a client list/ list of client information, attempt to identify the website of the business based on the emails in the data.
  Then, give the website name, business name, and if the user explicitly requested a template, give the template name to the email_creation_by_website_and_template tool.
  Then use the list_how_to_generate_a_proposal tool to understand what I am looking for in the response, what to avoid, and how to format the email.
  Last, give back afew things to the user. Provide the Subject, Body (fully filled in, placeholders filled in, ready to send with context scraped from the website weaved in as well), Business Name (preferably from the scraped website data), the template used, and the reasoning for using the template. This email needs to literally be ready to send, placeholders filled in, and fully ready to go.

  What to avoid
  Long paragraphs. Jargon. Multiple CTAs. Vague promises. Overuse of emojis.
  Do not use and I mean NEVER use "---" in the email to separate sections, trains of thought, etc. This is a tell tale sign of a bot. Do not use "---" in the email.
  The Body you generate needs to be fully filled in, placeholders filled in, ready to send with context scraped from the website weaved in as well. Like I need to be able to copy it a paste it directly into an email client and have it be ready to send.
  Format it in a way where it is the easiest to do that

`

// Simple content extraction for saved messages
const extractContent = (content: any): string => {
  if (typeof content === 'string') {
    return content;
  } else if (content && typeof content === 'object') {
    if (content.text) return content.text;
    if (content.content) return content.content;
    if (Array.isArray(content)) {
      return content.map(c =>
        typeof c === 'string' ? c : (c.text || c.content || JSON.stringify(c))
      ).join(' ');
    }
    return JSON.stringify(content);
  }
  return String(content || '');
};

const generateConversationTitle = async (firstMessage: string) => {
  try {
    const systemPrompt = `
    You are a helpful assistant that generates short, descriptive titles for conversations.
    Create a concise title (max 50 characters) that captures the main topic or intent of the conversation.
    Be specific and avoid generic titles like "Chat" or "Conversation".
    `;

    const userPrompt = `
    Generate a title for this conversation that starts with: "${firstMessage}"
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_completion_tokens: 20,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content?.trim() || "New Chat";
  } catch (error) {
    console.error('Error generating conversation title:', error);
    // Return a fallback title based on the first message
    const truncatedMessage = firstMessage.substring(0, 30);
    return truncatedMessage.length < firstMessage.length
      ? `${truncatedMessage}...`
      : truncatedMessage;
  }
}

/*
*/
const zipCodeAnalysisAgent = new Agent({
  name: 'MarketAnalyst',
  instructions: `You are a market research analyst for local service businesses.

  TASK: Produce a concise, field-ready neighborhood and housing analysis within a specified radius of the office.

  Include at the TOP (if provided in context):
  Seasonal services to prioritize:
  - [List the services currently marketed for THIS season/month. Use prior context if available; otherwise skim the website. Max 5 bullets.]

  Then organize insights into THREE named categories:

  1) High-End Luxury (Price threshold for “high-end homeowners”)
  - Determine a numeric price threshold for high-end homes in this market (e.g., 90th–95th percentile of home values). State the threshold as: Price threshold for “high-end homeowners”: $X.
  - Identify the TOP 5 ZIPs/neighborhoods with the highest share of homes above this threshold.
  - For EACH ZIP: include ZIP code, one example street or specific address with an estimated/current home value, and add local authority notes (HOA quirks, historic restrictions, city zoning traits, etc.).

  2) Upper-Tier Neighborhoods (Top 20% Median Value ZIPs)
  - Identify ZIPs ranking in the TOP 20% for median home value.
  - For EACH ZIP: include ZIP code, 1–2 notable addresses/streets with values, and local notes.

  3) Established Estates (Older + large homes)
  - Definition: ≥15 years & ≥4,000 sq ft.
  - Highlight subdivisions/HOAs/neighborhoods that match.
  - For EACH: include ZIP code, specific subdivision/HOA name, one example address with home value + year built, and local notes.

  Quick Local Brief (MAX 5 bullets):
  - Blend housing stats and local context (tree cover, HOA quirks, architectural styles, etc.).

  RULES:
  - Stay concise and practical. Prefer bullets and short paragraphs.
  - If exact data isn’t available, use best-available public indicators and clearly label estimates.
  - Do NOT ask questions; proceed with reasonable assumptions and note limitations.
  - Use the requested radius (miles) around the office; default to 20 miles if not specified.`,
  model: 'gpt-5-mini',
  tools: [webSearchTool()],
  modelSettings: { parallelToolCalls: true }
}).asTool({
  toolName: 'zip_code_analysis',
  toolDescription: 'Analyze ZIP code demographic data and provide actionable market insights for local service businesses.',
});


const businessDataExtractionAgent = new Agent({
  name: 'BusinessDataExtraction',
  instructions: `You are a business data extraction agent. Produce a short, focused output for the current season/month.

  OUTPUT FORMAT (keep it concise):
  Seasonal services to prioritize:
  - [Pull directly from the website for the current season/month]
  - [Ignore off-season services]
  - [3–7 bullet points maximum]

  Key details:
  - Service areas (cities/regions)
  - Target customers (homeowners, B2B, etc.)
  - Proof points (licenses, years, awards) if present
  - Relevant promo/CTA if clearly stated

  RULES:
  - No raw links. Avoid long quotes; use short phrases.
  - 120–180 words total. Be direct and useful for marketing.
  - Scan homepage/services (and one obvious seasonal page) only; no deep crawl.
  - If something isn't stated, omit it rather than guessing.
  - Do not ask questions.`,
  tools: [webSearchTool()],
  model: "gpt-5-mini",
  modelSettings: { parallelToolCalls: true }
}).asTool({
  toolName: 'business_data_extraction',
  toolDescription: 'Extract seasonal services to prioritize and key details (concise).',
});

// Tiny agent to generate concise thread titles from message snippets
const titleGeneratorAgent = new Agent({
  name: 'TitleGenerator',
  instructions: `You write short, clear chat titles.

RULES:
- Max 50 characters
- Specific and descriptive
- No quotes or punctuation at ends
- Title case preferred
- Return ONLY the title text`,
  tools: [],
  model: 'gpt-5-mini',
  modelSettings: { parallelToolCalls: false }
});

const emailCreationAgent = new Agent({
  name: 'EmailCreation',
  instructions: `You are an email creation specialist for Dope Marketing.

  ${dopeVoice}

  TASK: Propose 3–5 DOPE Marketing campaigns tailored to the categories above (from analysis). Campaign types should include:
  - Neighborhood Reactivation (use past job lists → mail their neighbors)
  - MTV Cribs (high-end homes, drops of 1,000 / 2,500 / 5,000)
  - Up to 50% Off Retail EDDM advantage with ZIP-level targeting notes

  FORMAT EACH CAMPAIGN AS: [Tactic → Audience → One-line angle]
  For each campaign, also provide 3–5 example headlines the account manager can review.
  Make clear these are suggestions and the AM must verify before sending to the client.

  OUTPUT FORMAT (exactly):
  Client & Focus: [Client Name] — [current seasonal services list]

  Priority Areas:
  - High-End Luxury ($X+ Home Concentrations): [Top 3 ZIPs + addresses (with ZIP code + home value) + authority notes]
  - Upper-Tier Neighborhoods (Top 20–30% Median Value): [Top ZIPs + addresses (with ZIP code + home value) + notes]
  - Established Estates (Older + Large Homes): [Neighborhoods/HOAs + addresses (with ZIP code + home value) + notes]

  Quick Local Brief (5 bullets max):
  - [Concise local context]

  Campaigns (3–5):
  - [Tactic → Audience → One-liner angle]

  Example Headlines (for AM review only, suggestions not final):
  - Headline 1
  - Headline 2
  - Headline 3

  RULES:
  - Use the most recent Step 1 and Step 2 context.
  - Keep copy tight and actionable; no jargon; one clear CTA implied.
  - Do not invent facts; if details are missing, keep that line succinct.
  - Do not ask questions.`,
  tools: [],
  model: "gpt-5-mini",
  modelSettings: { parallelToolCalls: false }
}).asTool({
  toolName: 'email_creation',
  toolDescription: 'Create compelling outreach emails based on business data and market analysis.',
});


/* ------------------------------------------------------------------------------------------------

TOOL KEY-PAIR MAPPINGS

-------------------------------------------------------------------------------------------------- */

// Tool display names mapping for cleaner user interface
const TOOL_DISPLAY_NAMES = {
  // Email & Proposal Tools
  'list_templates': '📧 Templates',
  'list_how_to_generate_a_proposal': '📋 Proposal Guide',
  
  // Agent Tools
  'business_data_extraction': '🔍 Extract Data',
  'zip_code_analysis': '📊 Market Analysis',
  'email_creation': '📧 Create Emails',
  
  // Leadership & Team Tools
  'facilitate_standup': '👥 Standup',
  
  // Pinecone Database Tools
  'pinecone_list_indexes': '🗂️ List Indexes',
  'pinecone_create_index': '➕ Create Index',
  'pinecone_add_to_index': '📝 Add Data',
  'pinecone_add_employee_data_to_index': '👤 Add Employee',
  'pinecone_add_transcript_data_to_index': '📄 Add Transcript',
  'pinecone_semantic_search': '🔎 Search',
  
  // Specialized Pinecone Searches
  'pinecone_company_knowledge_semantic_search': '🏢 Company Knowledge',
  'pinecone_employee_data_semantic_search': '👥 Employee Profiles',
  'pinecone_transcript_data_semantic_search': '📝 Transcript Search',
  'pinecone_email_templates_semantic_search': '📧 Email Templates',
  'pinecone_faq_data_semantic_search': '❓ FAQ Search',
  
  // Account Management
  'dope_active_account_lookup': '📊 Account Lookup',
  'dope_active_account_upsert': '➕ Add Account',
  
  // Web Tools
  'web_search': '🌐 Web Search'
};

// Function to get display name for a tool
export const getToolDisplayName = (toolName: string): string => {
  return TOOL_DISPLAY_NAMES[toolName as keyof typeof TOOL_DISPLAY_NAMES] || toolName;
};

// Export the tool display names mapping
export { TOOL_DISPLAY_NAMES };

/* ------------------------------------------------------------------------------------------------

TOOLS

-------------------------------------------------------------------------------------------------- */

const listTemplatesTool = tool({
  name: 'list_templates',
  description: 'List all the templates available. Used when an Account Manager asks for a template or wants to see all templates or wants to understand what templates are available.',
  parameters: z.object({}),
  execute: async (input) => {
    return emailTemplates;
  },
});

const listHowToGenerateAProsal = tool({
  name: 'list_how_to_generate_a_proposal',
  description: 'List the steps to generate a proposal',
  parameters: z.object({}),
  execute: async (input) => {
    return howToGenerateAProsal;
  },
});


/* ------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------- */

const facilitateStandupTool = tool({
  name: 'facilitate_standup',
  description: 'Help facilitate standup meetings and team communication',
  parameters: z.object({
    teamSize: z.number().describe('Number of team members'),
    agenda: z.string().nullable().optional().describe('Specific agenda items'),
  }),
  execute: async (input) => {
    const { teamSize, agenda } = input;

    const standupStructure = [
      '# Standup Meeting Structure\n\n',
      '## Standard Format\n',
      '- What did you accomplish yesterday?\n',
      '- What will you work on today?\n',
      '- Are there any blockers or challenges?\n\n',
      `## Team Size: ${teamSize} members\n`,
      `**Recommended duration:** ${Math.ceil(teamSize * 2)} minutes\n\n`,
      agenda ? `## Additional Agenda Items\n${agenda}\n\n` : '',
      '## Best Practices\n',
      '- Keep updates concise and focused\n',
      '- Address blockers immediately after standup\n',
      '- Encourage team collaboration and support'
    ];

    return standupStructure.join('');
  },
});
// pinecone tools
const pineconeListIndexesTool = tool({
  name: 'pinecone_list_indexes',
  description: 'List all the indexes in Pinecone',
  parameters: z.object({}),
  execute: async (input) => {
    return await listIndexesFromPinecone();
  },
});
const pineconeCreateIndexTool = tool({
  name: 'pinecone_create_index',
  description: 'Create a new Pinecone index',
  parameters: z.object({
    indexName: z.string().describe('The name of the Pinecone index to create'),
  }),
  execute: async (input) => {
    const { indexName } = input;
    return await createIndex(indexName);
  },
});
const pineconeAddEmployeeDataToIndexTool = tool({
  name: 'pinecone_add_employee_data_to_index',
  description: 'Add employee data to a Pinecone index.',
  parameters: z.object({
    data: z.object({
      employeeData: z.object({
        employeeId: z.string().describe('Employee ID'),
        name: z.string().describe('Full name'),
        organization: z.string().describe('Organization'),
        position: z.string().describe('Position'),
        reportsTo: z.string().describe('Reports to'),
        gender: z.string().optional().nullable().describe('Gender'),
        assessmentDate: z.string().describe('Assessment date'),
        all34: z.array(z.string()).describe('All 34 strengths'),
        leadDomain: z.enum(['Executing', 'Influencing', 'Relationship Building', 'Strategic Thinking']).describe('Lead domain'),
        themeDomains: z.object({
          Executing: z.array(z.string()),
          Influencing: z.array(z.string()),
          RelationshipBuilding: z.array(z.string()),
          StrategyThinking: z.array(z.string()),
        }).describe('Theme domains'),
        bestCollabWith: z.string().describe('Best collaboration description'),
        communicationTips: z.string().describe('Communication tips'),
        howToCoach: z.string().describe('How to coach'),
        motivators: z.array(z.string()).describe('Motivators'),
        demotivators: z.array(z.string()).describe('Demotivators'),
        watchouts: z.string().describe('Watchouts'),
        evidenceQuotes: z.array(z.object({
          quote: z.string(),
          section: z.string(),
        })).describe('Evidence quotes'),
        sourceDocUrl: z.string().optional().nullable().describe('Source document URL'),
        sourceProvenance: z.string().optional().nullable().describe('Source provenance'),
      }).describe('Employee data'),
      tags: z.array(z.string()).optional().nullable().describe('Tags for categorization'),
      source: z.string().optional().nullable().describe('Source information'),
    }).describe('The employee data to add to the Pinecone index'),
  }),
  execute: async (input) => {
    const { data } = input;
    return await addEmployeeDataToIndex('dope-employee-data', data);
  },
});
const pineconeAddTranscriptDataToIndexTool = tool({
  name: 'pinecone_add_transcript_data_to_index',
  description: 'Add transcript data to a Pinecone index',
  parameters: z.object({
    data: z.object({
      transcriptData: z.object({
        title: z.string().describe('The title of the transcript'),
        meetingType: z.enum(['interview', 'call', 'meeting', 'presentation', 'other']).optional().nullable(),
        duration: z.number().optional().nullable().describe('Duration in minutes'),
        participants: z.array(z.string()).optional().nullable(),
        location: z.string().optional().nullable(),
        department: z.string().optional().nullable(),
        confidentialityLevel: z.enum(['public', 'internal', 'confidential', 'restricted']).optional().nullable(),
        action_items: z.array(z.string()).optional().nullable(),
        concepts_discussed: z.array(z.string()).optional().nullable(),
        date: z.string().optional().nullable(),
        key_topics: z.array(z.string()).optional().nullable(),
        summary: z.string().optional().nullable(),
      }).describe('Transcript metadata'),
      tags: z.array(z.string()).optional().nullable(),
      source: z.string().optional().nullable(),
    }).describe('The transcript data to add to the Pinecone index'),
  }),
  execute: async (input) => {
    const { data } = input;
    const td = data.transcriptData || {} as any;
    const cleaned = {
      transcriptData: {
        title: td.title ?? undefined,
        meetingType: td.meetingType ?? undefined,
        duration: td.duration ?? undefined,
        participants: Array.isArray(td.participants) ? td.participants : (td.participants ?? undefined),
        location: td.location ?? undefined,
        department: td.department ?? undefined,
        confidentialityLevel: td.confidentialityLevel ?? undefined,
        action_items: Array.isArray(td.action_items) ? td.action_items : (td.action_items ?? undefined),
        concepts_discussed: Array.isArray(td.concepts_discussed) ? td.concepts_discussed : (td.concepts_discussed ?? undefined),
        date: td.date ?? undefined,
        key_topics: Array.isArray(td.key_topics) ? td.key_topics : (td.key_topics ?? undefined),
        summary: td.summary ?? undefined,
      },
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ?? undefined),
      source: data.source ?? undefined,
    } as any;

    return await addTranscriptDataToIndex('dope-transcript-data', cleaned);
  },
});

// pinecone add to index
const pineconeAddToIndexTool = tool({
  name: 'pinecone_add_to_index',
  description: 'Add data to a Pinecone index',
  parameters: z.object({
    indexName: z.string().describe('The name of the Pinecone index to add data to. The current indexes are: ' + Object.values(INDEX_TYPES).join(', ')),
    data: z.object({
      title: z.string().describe('The title of the document'),
      content: z.string().describe('The content to add to the index'),
      // Restrict metadata to JSON-safe primitives and arrays so the schema has explicit types
      metadata: z
        .record(
          z.string(),
          z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.array(z.string()),
            z.array(z.number()),
            z.array(z.boolean()),
          ])
        )
        .optional()
        .nullable()
        .describe('Optional metadata for the document (string/number/boolean or arrays of these values only).'),
    }).describe('The data to add to the Pinecone index'),
  }),
  execute: async (input) => {
    const { indexName, data } = input;
    return await addToIndex(indexName, {
      title: data.title,
      content: data.content,
      metadata: data.metadata || undefined,
    });
  },
});

// pinecone semantic search tool
const pineconeSemanticSearchTool = tool({
  name: 'pinecone_semantic_search',
  description: 'Perform semantic search on a Pinecone index using query text (requires integrated embeddings).',
  parameters: z.object({
    indexName: z.string().describe('Index name to search in, it is your job to pick the right appropriate index to search in. The current indexes are: dope-email-templates (Email Templates), dope-transcript-data (Transcript Data), dope-faq-data (FAQ Data), dope-company-knowledge (Company Knowledge), dope-employee-data (Employee Data)'),
    query: z.string().describe('The query text to search for'),
    topK: z.number().int().positive().max(1000).optional().nullable().describe('Number of similar records to return (default 5)'),
    fields: z.array(z.string()).optional().nullable().describe('Optional list of fields to include in results'),
  }),
  execute: async (input) => {
    const { indexName, query, topK, fields } = input;
    const response = await semanticSearch(indexName, {
      query,
      topK: topK ?? undefined,
      namespace: '__default__',
      fields: fields ?? undefined,
    });
    return response;
  },
});

// dope-company-knowledge semantic search tool
const pineconeCompanyKnowledgeSemanticSearchTool = tool({
  name: 'pinecone_company_knowledge_semantic_search',
  description: 'Perform semantic search on the dope-company-knowledge index',
  parameters: z.object({
    query: z.string().describe('The query text to search for'),
  }),
  execute: async (input) => {
    const { query } = input;
    return await semanticSearch('dope-company-knowledge', { query, topK: 5, namespace: '__default__', fields: undefined });
  },
});
// dope-employee-data semantic search tool
const pineconeEmployeeDataSemanticSearchTool = tool({
  name: 'pinecone_employee_data_semantic_search',
  description: 'Perform semantic search on the dope-employee-data index',
  parameters: z.object({
    query: z.string().describe('The query text to search for'),
  }),
  execute: async (input) => {
    const { query } = input;
    return await semanticSearch('dope-employee-data', { query, topK: 5, namespace: '__default__', fields: undefined });
  },
});
// dope-transcript-data semantic search tool
const pineconeTranscriptDataSemanticSearchTool = tool({
  name: 'pinecone_transcript_data_semantic_search',
  description: 'Perform semantic search on the dope-transcript-data index',
  parameters: z.object({
    query: z.string().describe('The query text to search for'),
  }),
  execute: async (input) => {
    const { query } = input;
    return await semanticSearch('dope-transcript-data', { query, topK: 5, namespace: '__default__', fields: undefined });
  },
});
// dope-email-templates semantic search tool
const pineconeEmailTemplatesSemanticSearchTool = tool({
  name: 'pinecone_email_templates_semantic_search',
  description: 'Perform semantic search on the dope-email-templates index',
  parameters: z.object({
    query: z.string().describe('The query text to search for'),
  }),
  execute: async (input) => {
    const { query } = input;
    return await semanticSearch('dope-email-templates', { query, topK: 5, namespace: '__default__', fields: undefined });
  },
});
// dope-faq-data semantic search tool
const pineconeFaqDataSemanticSearchTool = tool({
  name: 'pinecone_faq_data_semantic_search',
  description: 'Perform semantic search on the dope-faq-data index',
  parameters: z.object({
    query: z.string().describe('The query text to search for'),
  }),
  execute: async (input) => {
    const { query } = input;
    return await semanticSearch('dope-faq-data', { query, topK: 5, namespace: '__default__', fields: undefined });
  },
});

// Lookup Dope Active Account by name
const dopeActiveAccountLookupTool = tool({
  name: 'dope_active_account_lookup',
  description: 'Lookup a Dope Active Account by account name and return a readable summary of 2025 monthly values.',
  parameters: z.object({
    account_name: z.string().describe('Exact account name to look up, e.g., Coconut Cleaning'),
  }),
  execute: async (input) => {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const normalizeQuotes = (s: string) => s.replace(/[\u2018\u2019\u201B\u2032]/g, "'");
    const removeApostrophes = (s: string) => s.replace(/['’]/g, "");
    const insertApostropheSOnce = (s: string) => s.replace(/\b([A-Za-z]+)s\b(?!')/, "$1's");

    const original = (input.account_name || '').trim();
    const normalizedName = normalizeQuotes(original);
    const candidates = Array.from(new Set([
      original,
      normalizedName,
      removeApostrophes(normalizedName),
      insertApostropheSOnce(normalizedName),
    ].filter(Boolean)));

    let doc: any = null;
    let matchedName: string | null = null;
    for (const candidate of candidates) {
      const res = await convex.query(convexApi.threads.getDopeActiveAccountByName, { account_name: candidate });
      if (res) {
        doc = res;
        matchedName = candidate;
        break;
      }
    }

    if (!doc) {
      return `No active account found for "${input.account_name}". Tried variants: ${candidates.map(c => `"${c}"`).join(', ')}.`;
    }

    const toInt = (val: any): number => {
      if (val === null || val === undefined) return 0;
      const s = String(val).replace(/,/g, '').trim();
      const n = parseInt(s, 10);
      return Number.isFinite(n) ? n : 0;
    };
    const fmt = (n: number) => n.toLocaleString('en-US');

    // Use only the 2025 field
    const yearData = (doc.year_2025 || {}) as Record<string, any>;
    const monthOrder = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthLines: string[] = [];
    let total = 0;
    let countedMonths = 0;
    let topMonth: string | null = null;
    let topValue = -1;
    for (const m of monthOrder) {
      const val = toInt(yearData[m]);
      monthLines.push(`- ${m} 2025: ${fmt(val)}`);
      total += val;
      if (val > 0) countedMonths += 1;
      if (val > topValue) { topValue = val; topMonth = m; }
    }
    const avg = countedMonths > 0 ? Math.round(total / countedMonths) : 0;

    const hubspot = doc.hubspot_id ? `\n- HubSpot ID: ${doc.hubspot_id}` : '';
    const industry = doc.industry ? `\n- Industry: ${doc.industry}` : '';
    const accountId = doc.account_id ? `\n- Account ID: ${doc.account_id}` : '';

    const summary = [
      `# 📊 Active Account Lookup`,
      `**Account Name:** ${doc.account_name || input.account_name}`,
      matchedName && matchedName !== (doc.account_name || input.account_name) ? `- Matched Using: ${matchedName}` : '',
      ``,
      `## Overview`,
      `- Found: Yes${accountId}${hubspot}${industry}`,
      ``,
      `## 2025`,
      monthLines.join('\n') || '_No monthly data on record for 2025._',
      ``,
      `## Totals`,
      `- Total Sends: ${fmt(total)}`,
      `- Average Sends (months with data): ${fmt(avg)}`,
      topMonth ? `- Top Month: ${topMonth} 2025 (${fmt(topValue)})` : `- Top Month: Not available`,
    ].join('\n');

    return summary;
  }
});

// Add/Update Dope Active Account data
const dopeActiveAccountUpsertTool = tool({
  name: 'dope_active_account_upsert',
  description: 'Add or update a Dope Active Account with 2025 monthly values.',
  parameters: z.object({
    account_name: z.string().describe('Account name, e.g., Coconut Cleaning'),
    account_id: z.string().nullable().optional().describe('Account ID'),
    hubspot_id: z.string().nullable().optional().describe('HubSpot ID'),
    industry: z.string().nullable().optional().describe('Industry'),
    // Use year_2025 to comply with Convex arg validator; server maps to '2025'
    year_2025: z.object({
      Jan: z.string().nullable().optional(),
      Feb: z.string().nullable().optional(),
      Mar: z.string().nullable().optional(),
      Apr: z.string().nullable().optional(),
      May: z.string().nullable().optional(),
      Jun: z.string().nullable().optional(),
      Jul: z.string().nullable().optional(),
      Aug: z.string().nullable().optional(),
      Sep: z.string().nullable().optional(),
      Oct: z.string().nullable().optional(),
      Nov: z.string().nullable().optional(),
      Dec: z.string().nullable().optional(),
    }).optional().nullable().describe('2025 year column with nested months'),
    
  }),
  execute: async (input) => {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    // Filter out null values to match the mutation schema
    const filteredInput: any = {
      account_name: input.account_name
    };
    
    // Add other fields only if they're not null
    Object.entries(input).forEach(([key, value]) => {
      if (key !== 'account_name' && value !== null) {
        filteredInput[key] = value;
      }
    });
    
    // Map input['2025'] to year_2025 if provided
    const anyInput: any = input as any;
    if (anyInput['2025'] && !input.year_2025) {
      filteredInput.year_2025 = anyInput['2025'];
    } else if (input.year_2025) {
      filteredInput.year_2025 = input.year_2025;
    }
    
    const result = await convex.mutation(convexApi.threads.upsertDopeActiveAccount, { account: filteredInput });
    return { success: true, id: result };
  }
});


/* ------------------------------------------------------------------------------------------------

REVIEW AGENTS

-------------------------------------------------------------------------------------------------- */

/*
const atlasAgent = new Agent({
  name: 'Atlas',
  instructions: `You are Atlas, a Business Intelligence Agent. You have the ability to conduct website analysis.

  Your key capabilities include:
  - Scanning websites to assess and give the user a deeper understanding of the business.
  - Generating targeted questions based on analyzed data for deeper understanding during interviews.
  - It is nessesary for you to return the information given throguh analysis tools. Don't leave anything out.
  - Being helpful overall and being a good agent.

  What I don't want you to do:
  - Give quick improvement ideas.
  - Conversion & UX suggestions.
  
  Just give the user a good understanding of the business.
  
  Whatever the user asks, use your tools to your advantage. For other specialized tasks, hand off to the appropriate agent.`,
  handoffDescription: 'Atlas - Business Intelligence Agent - Conducts website analysis.',
  tools: [analyzeWebsiteTool, deepResearchTool],
  model: "gpt-5-mini",
  modelSettings: {
    parallelToolCalls: true,
  }
});
// Agents as tools
const atlasTool = atlasAgent.asTool({
  toolName: 'atlas tool',
  toolDescription: 'Analyze a website for business intelligence.',
})
*/

// Consolidated style guide prompt used by Hermes instructions
const STYLE_GUIDE_PROMPT_HERMES = `You are a smart content formatter. Your job is to improve readability and structure while preserving ALL important information, especially emails, code, and specific data.

FORMATTING RULES:
- Use clear section headers with relevant emojis: ✅ **Section Name**
- Use bullet points (-) for lists, indent sub-points with 2 spaces
- Use tables for structured data with | headers | and --- separators
- Use code blocks for emails, code, or structured content
- Use bold (**text**) for emphasis and key terms
- Add proper spacing between sections and elements

CONTENT PRESERVATION RULES:
- NEVER modify emails, phone numbers, URLs, or code
- Keep specific data, numbers, and technical details unchanged
- Preserve the original meaning and all facts

EMAIL FORMATTING (CRITICAL):
- NEVER wrap emails in code blocks. Render as normal Markdown text.
- Separate each email option with clear spacing (double blank lines).
- Use this structure for each email, each field on its own line with a blank line between sections:
  **Option X — [Template Name]**
  
  **Subject:** [subject line]
  
  **Preview:** [preview text]
  
  **Body:** [email body content]
  
  **Signoff:** [signoff]
- Do not put multiple emails on a single line; ensure natural paragraph breaks.
- Use double line breaks between each email option to ensure proper separation.

SMART FORMATTING:
- If content contains emails, create a "📧 Email Options" section
- If content has structured data, use tables
- If content has steps or lists, use bullet points
- Add relevant emojis to section headers for visual clarity
- Keep the tone professional but engaging
- Use proper spacing and line breaks for readability

Use Tables when possible when presenting structured data.
`;

const hermesAgent = new Agent({
  name: 'Hermes',
  instructions: `You are Hermes, an Account Manager Assistant agent for DOPE Marketing. You have a vast amount of tools that you can use to help the account manager with account management. 

    ${whoIsDopeMarketing}

    ## ✅ User Satisfaction First
    Your operating principle is to satisfy the user's immediate request while following your guidelines. If there is ever a conflict between your internal workflow and what the user wants, prioritize the user's current goal. Ask a brief clarifying question only when necessary to proceed correctly.

    ## 🔧 **Available Tools:**
    You have access to specialized agent tools and account management tools:
    
    **Agent Tools:**
    - **business_data_extraction**: Extracts comprehensive business data from websites
    - **zip_code_analysis**: Analyzes ZIP code demographic data and market insights  
    - **email_creation**: Creates compelling outreach emails based on business data
    
    **Account Management Tools:**
    - **dope_active_account_lookup**: Look up active DOPE Marketing accounts by name to get monthly send data
    
    ## 📊 **Business Analysis Workflow (STEP-BY-STEP APPROACH):**
    ⚠️ **IMPORTANT**: You now use individual agent tools directly in a step-by-step approach for better user experience.
    
    FAST-PATH OPTION:
    - If the user explicitly requests a full analysis or to "run everything" (e.g., "do all three now", "full business analysis"), execute Steps 1 → 2 → 3 in succession without asking for confirmation between steps. Present each step's results as they complete.
    - Otherwise, default to the step-by-step flow below and ask before proceeding to the next step.

    When a user requests business analysis, execute this 3-step workflow ONE STEP AT A TIME, asking for user confirmation before proceeding:

    ### Step 1: Business Data Extraction (IMMEDIATE)
    When user requests business analysis, IMMEDIATELY use the **business_data_extraction** agent tool with instructions to produce a SHORT, FOCUSED output:
    - Title: "Seasonal services to prioritize" with 3–7 bullets pulled directly from the website for the current season/month (ignore off-season services)
    - Then add a small "Key details" section: service areas, target customers, proof points (if present), and any clear promo/CTA
    - No raw links or long quotes; 120–180 words total; direct and useful
    
    **After Step 1 completes:**
    - Present the concise results
    - Ask: "✅ **Step 1 Complete!** I've extracted seasonal services and key details. Proceed with **Step 2: Market Analysis** now?"

    ### Step 2: Market Analysis (ONLY if user confirms)
    If user confirms Step 2, use the **zip_code_analysis** agent tool to produce:
    - Seasonal services to prioritize (top, max 5 bullets, current season/month)
    - Three categories with details per ZIP/neighborhood:
      1) High-End Luxury: determine and state a price threshold for “high-end homeowners”, list top 5 ZIPs/neighborhoods over threshold; for each: ZIP, example street or address with value, local authority notes
      2) Upper-Tier Neighborhoods: ZIPs in top 20% median value; for each: ZIP, 1–2 notable addresses/streets with values, local notes
      3) Established Estates: ≥15 years & ≥4,000 sq ft; highlight subdivisions/HOAs; for each: ZIP, subdivision/HOA name, example address with value + year built, local notes
    - Quick Local Brief: max 5 bullets blending housing stats and local context (tree cover, HOA quirks, home styles)
    
    **After Step 2 completes:**
    - Present the market analysis results
    - Ask: "✅ **Step 2 Complete!** I've analyzed the market data. Would you like me to proceed with **Step 3: Email Creation** now?"

    ### Step 3: Email Creation (ONLY if user confirms)
    If user confirms Step 3, use the **email_creation** agent tool with combined context from Steps 1 & 2 to produce:
    - Client & Focus, Priority Areas (3 groups), Quick Local Brief (5 bullets max)
    - Campaigns (3–5): format each as [Tactic → Audience → One-liner angle]
    - Example Headlines: 3–5 suggestions for AM review (not final)
    
    **After Step 3 completes:**
    - Present the email creation results
    - Provide final summary: "✅ **Complete Business Analysis Finished!** All three steps completed successfully. Ready for client review."

    ## 📋 **Step Output Format:**
    For each step, present results like this:
    # 🔍 Step 1: Business Data Extraction Results
    **Analysis for:** [Business Name] | **Generated:** [Timestamp]
    
    [Raw output from business_data_extraction tool]
    
    **Next:** Would you like me to proceed with **Step 2: Market Analysis** now?
    
    ## ⚠️ **Critical Rules:**
    - Execute ONLY ONE STEP AT A TIME
    - ALWAYS ask for user confirmation before proceeding to the next step
    - Do NOT summarize, condense, or reformat agent outputs
    - Return agent outputs exactly as they are produced
    - Do not add your own commentary or explanations to agent outputs
    - Present the raw agent outputs as-is
  
    FORMATTING RULES (APPLY THESE WHEN WRITING RESPONSES):
    ${STYLE_GUIDE_PROMPT_HERMES}
    `,
  handoffDescription: 'Hermes - Account Manager Assistant - Uses tools to help the account manager with account management.',
  tools: [
    listTemplatesTool, 
    businessDataExtractionAgent,  // Agent as tool
    zipCodeAnalysisAgent,         // Agent as tool  
    emailCreationAgent,           // Agent as tool
    dopeActiveAccountLookupTool,  // Account lookup tool for testing
    listHowToGenerateAProsal, 
    pineconeCompanyKnowledgeSemanticSearchTool, 
    pineconeEmailTemplatesSemanticSearchTool, 
    pineconeTranscriptDataSemanticSearchTool, 
    pineconeFaqDataSemanticSearchTool, 
    webSearchTool()
  ],
  model: "gpt-5-mini",
  modelSettings: {
    parallelToolCalls: true,
  }
});

const steveAgent = new Agent({
  name: 'Steve',
  instructions: `You are Steve, a Leadership Agent. You leverage CliftonStrengths and employee profiles to enhance team collaboration and development.

  Your key capabilities include:
  - Facilitating standup meetings for improved communication
  - Supporting training and onboarding processes to integrate new employees effectively
  - Assisting in creating performance improvement plans tailored to individual strengths
  - Developing strategic rollout documents to guide organizational initiatives
  
  When users need leadership support, team development, or meeting facilitation, use your tools to provide structured guidance. For other specialized tasks, hand off to the appropriate agent.
  
  SOME TIPS:
    - Be genuinely helpful and interested
    - Ask follow-up questions to keep chatting
    - Always respond conversationally, never like you're searching
    - Ask engaging follow-up questions
  `,
  handoffDescription: 'Steve - Leadership Agent - Enhances team collaboration and development using CliftonStrengths and employee profiles.',
  tools: [facilitateStandupTool, pineconeCompanyKnowledgeSemanticSearchTool, pineconeEmployeeDataSemanticSearchTool, pineconeTranscriptDataSemanticSearchTool, webSearchTool()],
  model: "gpt-5-mini",
  modelSettings: {
    parallelToolCalls: true,
  }
});

const dopeAdminAgent = new Agent({
  name: 'Dope Admin',
  instructions: `You are Dope Admin, a Dope Marketing Admin Agent. You are going to help the engineeer complete any tasks and just be helpful overall.
  `,
  handoffDescription: 'Dope Admin - Dope Marketing Admin Agent - Helps the engineer complete any tasks and is helpful overall.',
  tools: [webSearchTool(), pineconeListIndexesTool, pineconeCreateIndexTool, pineconeAddToIndexTool, pineconeAddEmployeeDataToIndexTool, pineconeAddTranscriptDataToIndexTool, pineconeSemanticSearchTool],
  model: "gpt-5-mini",
  modelSettings: {
    parallelToolCalls: true,
  }
});

// ------------------------------------------------------------------------------------------------

const STYLE_GUIDE_PROMPT = `You are a smart content formatter. Your job is to improve readability and structure while preserving ALL important information, especially emails, code, and specific data.

FORMATTING RULES:
- Use clear section headers with relevant emojis: ✅ **Section Name**
- Use bullet points (-) for lists, indent sub-points with 2 spaces
- Use tables for structured data with | headers | and --- separators
- Use code blocks for emails, code, or structured content
- Use bold (**text**) for emphasis and key terms
- Add proper spacing between sections and elements

CONTENT PRESERVATION RULES:
- NEVER modify emails, phone numbers, URLs, or code
- Keep specific data, numbers, and technical details unchanged
- Preserve the original meaning and all facts

EMAIL FORMATTING (CRITICAL):
- NEVER wrap emails in code blocks. Render as normal Markdown text.
- Separate each email option with clear spacing (double blank lines).
- Use this structure for each email, each field on its own line with a blank line between sections:
  **Option X — [Template Name]**
  
  **Subject:** [subject line]
  
  **Preview:** [preview text]
  
  **Body:** [email body content]
  
  **Signoff:** [signoff]
- Do not put multiple emails on a single line; ensure natural paragraph breaks.
- Use double line breaks between each email option to ensure proper separation.

SMART FORMATTING:
- If content contains emails, create a "📧 Email Options" section
- If content has structured data, use tables
- If content has steps or lists, use bullet points
- Add relevant emojis to section headers for visual clarity
- Keep the tone professional but engaging
- Use proper spacing and line breaks for readability

ZIP CODE ANALYSIS CTA (CRITICAL):
- If the response mentions a business with a location, address, or ZIP code, ALWAYS end with:
  "📍 **ZIP Code Analysis Available**
  
  Would you like me to perform an in-depth ZIP code analysis for [ZIP CODE or area]? I can provide demographic insights, market data, and service area recommendations."
- Extract the ZIP code from addresses like "123 Main St, City, ST 12345" or similar patterns
- If no explicit ZIP code but a city/state is mentioned, use "the [City, State] area" instead

Return only the formatted content. Do not add commentary or explanations.`;

// const formatterAgent = new Agent({
//   name: 'Formatter',
//   instructions: STYLE_GUIDE_PROMPT,
//   handoffDescription: 'Formats assistant content into the desired Markdown style without changing meaning.',
//   tools: [],
//   model: 'gpt-5-mini',
//   modelSettings: { parallelToolCalls: false }
// });


// Request/Response schemas
const ChatRequestSchema = z.object({
  message: z.string(),
  threadId: z.string().nullable().optional(),
  agentId: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
});

const ChatResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  agentName: z.string(),
  history: z.array(z.any()),
  threadId: z.string().optional(),
  lastAgentId: z.string().optional(),
  toolCalls: z.array(z.object({
    name: z.string(),
    arguments: z.any(),
    result: z.any().optional(),
  })).optional(),
  agentHandoffs: z.array(z.object({
    from: z.string(),
    to: z.string(),
    timestamp: z.number(),
  })).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, threadId, agentId, userId, userName } = ChatRequestSchema.parse(body);

    console.log('[Chat API] Received request with user info:', { userId, userName, threadId });

    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Determine which agent to start with
    let currentAgent = hermesAgent; // Default to Hermes
    if (agentId === 'hermes') {
      currentAgent = hermesAgent;
    } else if (agentId === 'steve') {
      currentAgent = steveAgent;
    } else if (agentId === 'dope-admin') {
      currentAgent = dopeAdminAgent;
    }

    // Get or create thread - SIMPLE VERSION
    let savedMessages: any[] = [];
    let currentThreadId = threadId || null;

    if (currentThreadId) {
      // Load existing thread
      const existingThread = await convex.query(api.threads.getThread, {
        threadId: currentThreadId
      });
      if (existingThread) {
        savedMessages = existingThread.history || [];
      }
    } else {
      // Create new thread
      currentThreadId = `thread_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    }

    // Build proper conversation thread with history for context
    const conversationThread: AgentInputItem[] = [];

    // Add previous messages from history
    for (const msg of savedMessages) {
      if (msg.role === 'user') {
        conversationThread.push(user(extractContent(msg.content)));
      } else if (msg.role === 'assistant') {
        // Add assistant messages as system messages to provide context
        conversationThread.push({
          role: 'system',
          content: `Previous assistant response: ${extractContent(msg.content)}`
        });
      }
    }

    // Add the new user message
    conversationThread.push(user(message));

    // Run the chat session
    const result = await withTrace('Chat Session', async () => {
      return await run(currentAgent, conversationThread, {
        maxTurns: 20, // Limit turns to prevent infinite loops
      });
    });

    // Extract tool calls from the result history
    const toolCalls: Array<{ name: string, arguments: any, result?: any }> = [];
    let agentHandoffs: Array<{ from: string, to: string, timestamp: number }> = [];
    
    if (result.history) {
      const callResults = new Map();

      // First pass: collect function call results
      for (const item of result.history) {
        if (item.type === 'function_call_result') {
          callResults.set(item.callId, item.output);
        }
      }

      // Second pass: collect function calls and match with results
      for (const item of result.history) {
        if (item.type === 'function_call') {
          const toolCall = {
            name: item.name,
            arguments: typeof item.arguments === 'string' ? JSON.parse(item.arguments) : item.arguments,
            result: callResults.get(item.callId)
          };
          
          toolCalls.push(toolCall);
          
          // Detect agent handoffs based on tool name or result
          if (item.name.includes('handoff') || item.name.includes('delegate') || 
              (toolCall.result && typeof toolCall.result === 'object' && 
               (toolCall.result.agentName || toolCall.result.handoffTo))) {
            agentHandoffs.push({
              from: result.lastAgent?.name || currentAgent.name,
              to: toolCall.result?.agentName || toolCall.result?.handoffTo || 'Unknown Agent',
              timestamp: Date.now()
            });
          }
        }
        // Handle hosted tool calls (like web search)
        else if (item.type === 'hosted_tool_call') {
          toolCalls.push({
            name: item.name,
            arguments: item.providerData?.action || {},
            result: item.status === 'completed' ? 'Search completed successfully' : item.status
          });
        }
      }
    }

    // Formatting agent disabled; rely on Hermes instructions' formatting rules
    let finalOutput: string = result.finalOutput || 'No response generated';

    // Formatting agent disabled; rely on Hermes instructions' formatting rules

    // Convert tool call results into assistant messages to appear above the final reply
    const toolResultMessages = toolCalls
      .flatMap(tc => {
        const resultContent = tc?.result;
        const messages: Array<{ role: 'assistant'; content: string; timestamp: number; agentName: string }> = [];
        
        if (typeof resultContent === 'string') {
          messages.push({
            role: 'assistant',
            content: resultContent,
            timestamp: Date.now(),
            agentName: tc.name || result.lastAgent?.name || currentAgent.name,
          });
        } else if (resultContent && typeof resultContent === 'object') {
          // Handle agent tool results - create separate messages for each agent output
          if (tc.name === 'business_data_extraction' || tc.name === 'zip_code_analysis' || tc.name === 'email_creation') {
            // Skip displaying sub-agent tool results entirely to avoid clutter and confusion
          } else {
            // Handle other tool results
            let content: string | null = null;
            if (typeof (resultContent as any).completeAnalysis === 'string') {
              content = (resultContent as any).completeAnalysis;
            } else if (typeof (resultContent as any).text === 'string') {
              content = (resultContent as any).text;
            } else if (typeof (resultContent as any).output === 'string') {
              content = (resultContent as any).output;
            } else {
              try {
                content = JSON.stringify(resultContent, null, 2);
              } catch {
                content = String(resultContent);
              }
            }
            if (content) {
              messages.push({
                role: 'assistant',
                content,
                timestamp: Date.now(),
                agentName: tc.name || result.lastAgent?.name || currentAgent.name,
              });
            }
          }
        }
        return messages;
      });

    // Create simple message history for saving (with formatted content).
    // Order: prior history -> user -> tool results -> final assistant -> optional comprehensive analysis
    const messagesToSave = [
      ...savedMessages,
      {
        role: 'user',
        content: message,
        timestamp: Date.now(),
        agentName: 'user'
      },
      ...toolResultMessages,
      {
        role: 'assistant',
        content: finalOutput,
        timestamp: Date.now(),
        agentName: result.lastAgent?.name || currentAgent.name,
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined
      }
    ];

    // Save to Convex - simple create/update without auto-generating titles
    if (currentThreadId) {
      if (savedMessages.length === 0) {
        // Create new thread with a simple default title
        console.log('[Chat API] Creating new thread with:', { threadId: currentThreadId, userId, userName });
        await convex.mutation(api.threads.createThread, {
          threadId: currentThreadId,
          userId: userId,
          userName: userName,
          agentId: result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId || 'hermes',
          title: "New Chat",
          history: messagesToSave,
        });

        // Generate a better title from the latest user message (last 100 chars)
        const latestUserMessage = message.slice(-100);
        try {
          const titleGen = await run(titleGeneratorAgent, [user(`Title for: ${latestUserMessage}`)], { maxTurns: 1 });
          const generatedTitle = (titleGen.finalOutput || '').trim();
          if (generatedTitle) {
            await convex.mutation(api.threads.updateThreadTitle, {
              threadId: currentThreadId,
              title: generatedTitle,
            });
          }
        } catch (e) {
          console.warn('Title generation failed, keeping default title');
        }
      } else {
        // Update existing thread without overwriting title
        await convex.mutation(api.threads.updateThread, {
          threadId: currentThreadId,
          agentId: result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId,
          history: messagesToSave,
        });
      }
    }

    const response = ChatResponseSchema.parse({
      success: true,
      message: finalOutput,
      agentName: result.lastAgent?.name || currentAgent.name,
      history: messagesToSave,
      threadId: currentThreadId,
      lastAgentId: result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId,
      toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
      agentHandoffs: agentHandoffs.length > 0 ? agentHandoffs : undefined,
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Sorry, I encountered an error processing your request.',
        agentName: 'System',
        history: [],
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve available agents
export async function GET() {
  try {
    const agents = [
      {
        id: 'hermes',
        name: 'Hermes',
        description: 'Account Manager Assistant - Orchestrates comprehensive business analysis workflows using specialized agent tools for data extraction, market analysis, and email creation',
        capabilities: ['web-search', 'agent-orchestration', 'business-analysis', 'market-research', 'email-generation', 'client-analysis', 'sales-support'],
        tools: [
          'web_search',
          'business_data_extraction',
          'zip_code_analysis', 
          'email_creation',
          'dope_active_account_lookup',
          'pinecone_company_knowledge_semantic_search', 
          'pinecone_transcript_data_semantic_search', 
        ],
      },
      {
        id: 'steve',
        name: 'Steve',
        description: 'Leadership Agent - Leverages CliftonStrengths and employee profiles for team development',
        capabilities: ['web-search', 'team-collaboration', 'standup-facilitation', 'performance-improvement'],
        tools: [
          'web_search',
//          'facilitate_standup', 
          'pinecone_company_knowledge_semantic_search', 
          'pinecone_employee_data_semantic_search', 
          'pinecone_transcript_data_semantic_search', 
        ],
      },
      {
        id: 'dope-admin',
        name: 'Dope Admin',
        description: 'Dope Marketing Admin Agent - Helps the engineer complete any tasks and is helpful overall.',
        capabilities: ['web-search', 'admin-support'],
        tools: [
          'web_search', 
          'dope_active_account_lookup', 
          'dope_active_account_upsert', 
          'pinecone_list_indexes', 
          'pinecone_create_index', 
          'pinecone_add_to_index', 
          'pinecone_add_employee_data_to_index', 
          'pinecone_add_transcript_data_to_index', 
          'pinecone_semantic_search'
        ],
      },
    ];

    return NextResponse.json({
      success: true,
      data: agents,
      toolDisplayNames: TOOL_DISPLAY_NAMES,
    });

  } catch (error) {
    console.error('Error fetching chat agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

// PUT endpoint to generate a new title for a thread
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { threadId, messageContent } = body;

    if (!threadId || !messageContent) {
      return NextResponse.json(
        { success: false, error: 'Thread ID and message content are required' },
        { status: 400 }
      );
    }

    // Generate title using the title generator agent
    const titleResult = await run(titleGeneratorAgent, [user(`Generate a title for this conversation: ${messageContent}`)], { maxTurns: 1 });
    const generatedTitle = (titleResult.finalOutput || '').trim() || 'New Chat';

    return NextResponse.json({
      success: true,
      title: generatedTitle,
    });

  } catch (error) {
    console.error('Title generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate title' },
      { status: 500 }
    );
  }
}
