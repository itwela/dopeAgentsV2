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
import { analyzeWebsiteViaFirecrawl, deepResearchAnything } from '../../../agentActions';
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { listIndexesFromPinecone, createIndex, addToIndex, addEmployeeDataToIndex, addTranscriptDataToIndex, semanticSearch } from '../../../../services/pineconeService';
import { INDEX_TYPES } from '../../../../types/metadata';


import { setDefaultOpenAIKey } from '@openai/agents';
import { setTracingExportApiKey } from '@openai/agents';
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

// MCP: Sequential Thinking server via stdio
const sequentialThinkingServer = new MCPServerStdio({
  name: 'sequential_thinking',
  fullCommand: 'npx -y @modelcontextprotocol/server-sequential-thinking',
});

/* ------------------------------------------------------------------------------------------------

REVIEW: Types

-------------------------------------------------------------------------------------------------- */ 

const emailSchema = z.object({
  subject: z.string(),
  body: z.string(),
  businessName: z.string(),
  templateUsed: z.string(),
  websiteName: z.string(),
  reasonForUsingTemplate: z.string().describe('The reason for using the template. No longer than 100 words.'),
});


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

When the user provides client info, weave that information into the subject or preview and or body so the message feels specific and relevant.
Use client info to make one concrete, believable claim (e.g., “Given your Little Canada house‑wash offering, a 7‑day pilot in one neighborhood usually surfaces booked jobs”) — do NOT invent data or claim site scans unless the user explicitly provided those facts.
Use no more than one or two/ specific signals to avoid overload; keep personalization tight and evidence‑based.
Personalization should always support an immediate conversion action (pilot, audit, inspection).
Voice & tone

Direct and assertive; outcome-driven (booked jobs, CPL, lift).
Confident and efficient — professional but energetic; avoid jokes, slang, or personal anecdotes.
Subtle urgency/seasonality allowed when relevant (e.g., “fall leaf load,” “pre‑winter”).
Structure & format (required)

Output exactly these labeled fields:
Subject: [≤ 7 words, benefit-driven, may include one token like City or Service]
Preview: [1-line clarifier, ~8–12 words]
Body: [80–140 words — single paragraph or 2 short paragraphs; optional 1–3 bullets max]
Signoff: —Dope Marketing
Exactly one CTA and it must be reply-text (e.g., Reply “YES”, Reply “Set it up”, Reply “Go”). No multiple CTAs or link-first CTAs in initial outreach.
Content rules

Open with a 1-line hook that uses the provided client signal (if any) and frames a specific problem or seasonal trigger (e.g., “For Little Canada homes, fall gutters create winter risk”). If no signal provided, use a neutral industry hook.
Follow with a short insight/benefit (1–2 sentences) using active verbs: run, test, pilot, measure, automate, scale.
Offer must be one sentence and scoped: what Dope will do, what client does, and what deliverable/metric is delivered (e.g., “7‑day pilot — we run ads, deliver booked list + HubSpot metrics”).
Include one credibility token when appropriate (HubSpot, CPL, booked job, before/after photos, years in market).
Personalization limit: at most one specific signal beyond Company to keep messages sharp and believable.
Language & phrasing

Short, punchy sentences. Active voice.
Use numeric quantifiers and concrete timeframes (7‑day pilot, 20‑minute audit, 30‑minute inspection).
Favor reply CTAs and low‑friction asks.
Avoid corporate buzzwords and emotional fluff.
Include one small proof point in follow-ups if available (metric + similar client).
Bullets

Use bullets only for clarity (2–4 items maximum). Each ≤ 10 words.
Length & quality checks

Body length: 80–140 words. Truncate if longer.
Exactly one reply-based CTA.
No jokes, slang, or founder anecdotes.
Use at least one credibility token when relevant.
Subject ≤ 7 words and benefit-focused.
Tokens/phrases to use

pilot, run, test, measure, ship, automate, track, CPL, booked job(s), HubSpot, photo documentation, neighborhood push, booking flow, steam ice-dam removal, 7‑day pilot, 20‑minute audit.
Prohibitions

Do not invent facts or attribute actions you haven’t been given. Only use client details the user supplies.
No more than one casual/founder‑energy phrase per email and only if it aids clarity.
Clarifying rule

If required input is missing (Company, Service, or CTA), ask exactly one clarifying question instead of guessing.

`
const whenToUseTools = `

  If you are given a task with more than 1 step, you must use sequential thinking to plan out the task first.
  Then, you must use the appropriate tool to complete each step.
  Then, you must return the final result to the user.

  If you are given a task or find you need up to date information, you can use your best judgement on if the web search tool would be useful.

  If a user says: I want to use your web search tool to... then you should use the web search tool.
  I want to use your thinking mode tool to... then you should use the sequential thinking tool.

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

/* ------------------------------------------------------------------------------------------------

REVIEW TOOLS FOR HERMES

-------------------------------------------------------------------------------------------------- */ 

const listTemplatesTool = tool({
  name: 'list_templates',
  description: 'List all the templates available',
  parameters: z.object({}),
  execute: async (input) => {
    return emailTemplates;
  },
});
const emailCreationByWebsiteAndTemplateTool = tool({
  name: 'email_creation_by_website_and_template',
  description: 'Create an email based on a website and template',
  parameters: z.object({
    websiteName: z.string().describe('The website to use for scraping'),
    businessName: z.string().describe('The business name to use'),
    userRequestedTemplateName: z.string().nullable().describe('The template to use if the user explicitly requested it'),
  }),
  execute: async (input) => {

    const { websiteName, businessName, userRequestedTemplateName } = input;  

    const allScrapedWebsiteInformation = await analyzeWebsiteViaFirecrawl(websiteName, 'content');

    // Prefer structured extraction result from Firecrawl; fallback to OpenAI summarizer if unavailable
    const tailoredSummaryOfWebsiteScrape = allScrapedWebsiteInformation?.structured
    
    const systemPrompt = `Your goal is to write a higly personlized outreach email FROM DOPE TO a potential client using all the information provided to you.

    Here is some information about DOPE Marketing:
    ${whoIsDopeMarketing}

    Here is the voice of DOPE Marketing:
    ${dopeVoice}


  EMAIL TEMPLATES TO USE (from DOPE's perspective), you must use one of these templates:
  ${emailTemplates.map(template => `Name: ${template.name}\nDescription: ${template.description}\nTemplate: ${template.template}`).join('\n\n')}


    Generate a complete, personalized marketing email FROM DOPE TO ${businessName}.`;

    const userPrompt = `

    TARGET BUSINESS NAME:
    ${businessName}

    TARGET BUSINESS WEBSITE INFORMATION:
    ${tailoredSummaryOfWebsiteScrape}

    ${userRequestedTemplateName ? `
      The User explicitly requested the following template: ${emailTemplates.find(template => template.name === userRequestedTemplateName)?.name}` 
    : ``}

    Generate a complete, personalized marketing email FROM DOPE TO ${businessName}.`;

    const response = await openai.responses.parse({
      model: "gpt-5-mini",
      input: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      text: {
        format: zodTextFormat(emailSchema, "email"),
      },
    });
    
    const emailResponseData = response.output_parsed;
    
    return {
        subject: emailResponseData?.subject,
        body: emailResponseData?.body,
        businessName: emailResponseData?.businessName,
        templateUsed: emailResponseData?.templateUsed,
        websiteName: emailResponseData?.websiteName,
        reasonForUsingTemplate: emailResponseData?.reasonForUsingTemplate,
    };

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

REVIEW TOOLS FOR STEVE

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

/* ------------------------------------------------------------------------------------------------

REVIEW TOOLS FOR ATLAS

-------------------------------------------------------------------------------------------------- */ 

const analyzeWebsiteTool = tool({
  name: 'analyze_website',
  description: `Conduct website analysis for business intelligence and competitive insights.
  
  If the analysis type is "gather-style-of-speaking", you need to take the results and come up with a master plan for the style of speaking of the website.
  Think lexicon, tone, stlye, go in depth.
  This needs to be somehting that is directly useful for an Ai to use to speak like how you notice on the website.

  `,
  parameters: z.object({
    websiteUrl: z.string().describe('URL of the website to analyze'),
    analysisType: z.string().describe('Type of analysis: content, gather-style-of-speaking'),
  }),
  execute: async (input) => {
    const { websiteUrl, analysisType } = input;

    let allScrapedWebsiteInformation = null;
    let tailoredSummaryOfWebsiteScrape = null;
    let styleOfSpeaking = null;

    if (analysisType === 'gather-style-of-speaking') {

      /* 
      ------------------------------------------------------------
      We want to gather the style of speaking of the website.
      Because of this, we need to gather more information from the website.
      Thus, the limit is set to 50.
      ------------------------------------------------------------
      */
      styleOfSpeaking = await analyzeWebsiteViaFirecrawl(websiteUrl, analysisType as 'content' | 'gather-style-of-speaking');

      return {
        websiteUrl: websiteUrl,
        analysisType: analysisType,
        source: styleOfSpeaking?.source,
        styleOfSpeaking: styleOfSpeaking?.structured,
      };

    } else {

      allScrapedWebsiteInformation = await analyzeWebsiteViaFirecrawl(websiteUrl, analysisType as 'content' | 'gather-style-of-speaking');
      tailoredSummaryOfWebsiteScrape = allScrapedWebsiteInformation?.structured

      return {
        websiteUrl: websiteUrl,
        analysisType: analysisType,
        tailoredSummaryOfWebsiteScrape: tailoredSummaryOfWebsiteScrape,
      };
      
    }

  },
});

const deepResearchTool = tool({
  name: 'deep_research',
  description: 'Research ANYTHING - companies, people, topics, industries, trends, technologies, etc. Completely flexible research tool for any query.',
  parameters: z.object({
    researchQuery: z.string().describe('What you want to research. Examples: "Tesla competitors", "AI trends 2024", "How does Netflix content strategy work", "Sustainable packaging solutions", "Remote work productivity tools", etc.'),
    websiteUrl: z.string().optional().nullable().describe('Optional: Include a specific website to focus research on, or null to research the topic generally'),
  }),
  execute: async (input) => {
    const { researchQuery, websiteUrl } = input;
    return await deepResearchAnything(researchQuery, websiteUrl || undefined);
  },
});


/* ------------------------------------------------------------------------------------------------

REVIEW TOOLS FOR JUNO

-------------------------------------------------------------------------------------------------- */ 

const queryDataTool = tool({
  name: 'query_data',
  description: 'Connect to data analytics tools and provide insights',
  parameters: z.object({
    dataSource: z.string().describe('The data source or database to query'),
    queryType: z.string().describe('Type of analysis: performance, trends, comparison'),
  }),
  execute: async (input) => {
    const { dataSource, queryType } = input;
    
    // Mock data analysis (would connect to Metabase in production)
    const dataInsights = [
      `# Data Analytics Report\n\n`,
      `**Data Source:** ${dataSource}\n`,
      `**Query Type:** ${queryType}\n\n`,
      `## Key Metrics\n`,
      `- Performance indicators show positive trends\n`,
      `- Data quality is within acceptable parameters\n`,
      `- Recent patterns indicate growth opportunities\n\n`,
      `## Insights\n`,
      `- Recommendation: Focus on high-performing segments\n`,
      `- Consider expanding successful strategies\n`,
      `- Monitor key performance indicators regularly\n\n`,
      `## Next Steps\n`,
      `- Set up automated reporting for continuous monitoring\n`,
      `- Implement data-driven decision making processes\n`,
      `- Schedule regular analysis reviews`
    ];
    
    return dataInsights.join('');
  },
});

/* ------------------------------------------------------------------------------------------------

REVIEW TOOLS FOR DOPE ADMIN

-------------------------------------------------------------------------------------------------- */ 

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


/* ------------------------------------------------------------------------------------------------

REVIEW AGENTS

-------------------------------------------------------------------------------------------------- */ 

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
  mcpServers: [sequentialThinkingServer],
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

const hermesAgent = new Agent({
  name: 'Hermes',
  instructions: `You are Hermes, a Proposal Generator agent for DOPE Marketing. You utilize templates and company information to generate tailored proposals that we can use to sell our services to our clients. 

    ${whoIsDopeMarketing}

    ${dopeVoice}
    
    Your key capabilities include:
    - Creating proposals based on client needs and company standards
    - Integrating insights from previous proposals to enhance relevance and effectiveness
    - Streamlining the proposal creation process for faster turnaround times
    - Supporting the sales team with high-quality, persuasive proposals tailored to each client's unique requirements
    - Being helpful overall and being a good agent.
    
    - NOTE: if the user explicitly requests a template, use the list_templates tool to find the exact template name and then use the userRequestedTemplateName parameter to pass the template name to the email_creation_by_website_and_template tool.
    - NOTE: if the user requests about information on DOPE Marketing, use the pinecone_semantic_search tool to search the DOPE Knowledge Base.

    ${howToGenerateAProsal}.

    When users need proposal generation, use sequential thinking first to plan out the task and then follow the steps to generate a proposal. For other specialized tasks, hand off to the appropriate agent.

    Here are the templates we have available just for reference:
    ${emailTemplates.map(template => `- ${template.name}: ${template.description}`).join('\n')}

  `,
  handoffDescription: 'Hermes - Proposal Generator - Creates tailored proposals based on client needs and company standards.',
  tools: [listTemplatesTool, emailCreationByWebsiteAndTemplateTool, listHowToGenerateAProsal, pineconeCompanyKnowledgeSemanticSearchTool, pineconeEmailTemplatesSemanticSearchTool, pineconeTranscriptDataSemanticSearchTool, pineconeFaqDataSemanticSearchTool],
  mcpServers: [sequentialThinkingServer],
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
  tools: [atlasTool, facilitateStandupTool, pineconeAddTranscriptDataToIndexTool, pineconeCompanyKnowledgeSemanticSearchTool, pineconeEmployeeDataSemanticSearchTool, pineconeTranscriptDataSemanticSearchTool, webSearchTool()],
  mcpServers: [sequentialThinkingServer],
  model: "gpt-5-mini",
  modelSettings: {
    parallelToolCalls: true,
  }
});

const junoAgent = new Agent({
  name: 'Juno',
  instructions: `You are Juno, a Data Integration Agent. You connect to data analytics tools like Metabase to provide comprehensive data analytics capabilities.

  Your key capabilities include:
  - Centralizing data access to eliminate the need for multiple tools, improving effectiveness
  - Providing insights derived from data analytics to support decision-making processes
  - Currently undergoing testing to ensure seamless connectivity and functionality
  
  When users need data analytics, insights, or database queries, use your tools to provide comprehensive analysis. For other specialized tasks, hand off to the appropriate agent.`,
  handoffDescription: 'Juno - Data Integration Agent - Connects to Metabase and other tools for comprehensive data analytics.',
  tools: [queryDataTool, webSearchTool()],
  mcpServers: [sequentialThinkingServer],
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
  mcpServers: [sequentialThinkingServer],
  model: "gpt-5-mini",
  modelSettings: {
    parallelToolCalls: true,
  }
});

// Set up handoffs between agents
hermesAgent.handoffs = [steveAgent, atlasAgent, junoAgent];
steveAgent.handoffs = [hermesAgent, atlasAgent, junoAgent];
atlasAgent.handoffs = [hermesAgent, steveAgent, junoAgent];
junoAgent.handoffs = [hermesAgent, steveAgent, atlasAgent];


// Request/Response schemas
const ChatRequestSchema = z.object({
  message: z.string(),
  threadId: z.string().nullable().optional(),
  agentId: z.string().optional(),
  userId: z.string().optional(),
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
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, threadId, agentId, userId } = ChatRequestSchema.parse(body);

    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Determine which agent to start with
    let currentAgent = hermesAgent; // Default to Hermes
    if (agentId === 'hermes') {
      currentAgent = hermesAgent;
    } else if (agentId === 'steve') {
      currentAgent = steveAgent;
    } else if (agentId === 'atlas') {
      currentAgent = atlasAgent;
    } else if (agentId === 'juno') {
      currentAgent = junoAgent;
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

    // Connect MCP server, run, then close
    await sequentialThinkingServer.connect();

    const result = await withTrace('Chat Session', async () => {
      return await run(currentAgent, conversationThread, {
        maxTurns: 20, // Limit turns to prevent infinite loops
      });
    });
    
    await sequentialThinkingServer.close();

    // Extract tool calls from the result history
    const toolCalls: Array<{name: string, arguments: any, result?: any}> = [];
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
          toolCalls.push({
            name: item.name,
            arguments: typeof item.arguments === 'string' ? JSON.parse(item.arguments) : item.arguments,
            result: callResults.get(item.callId)
          });
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

    // Create simple message history for saving
    const messagesToSave = [
      ...savedMessages,
      {
        role: 'user',
        content: message,
        timestamp: Date.now(),
        agentName: 'user'
      },
      {
        role: 'assistant', 
        content: result.finalOutput || 'No response generated',
        timestamp: Date.now(),
        agentName: result.lastAgent?.name || currentAgent.name,
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined
      }
    ];

    // Save to Convex - SIMPLE VERSION
    if (currentThreadId) {
      if (savedMessages.length === 0) {
        // Create new thread
        await convex.mutation(api.threads.createThread, {
          threadId: currentThreadId,
          userId: userId,
          agentId: result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId || 'hermes',
          title: "New Chat",
          history: messagesToSave,
        });
      } else {
        // Update existing thread
        await convex.mutation(api.threads.updateThread, {
          threadId: currentThreadId,
          agentId: result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId,
          title: "Chat", // Keep it simple
          history: messagesToSave,
        });
      }
    }

    const response = ChatResponseSchema.parse({
      success: true,
      message: result.finalOutput || 'No response generated',
      agentName: result.lastAgent?.name || currentAgent.name,
      history: messagesToSave,
      threadId: currentThreadId,
      lastAgentId: result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId,
      toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
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
        description: 'Proposal Generator - Utilizes templates and company information to generate tailored proposals',
        capabilities: ['web-search', 'proposal-generation', 'client-analysis', 'sales-support'],
        tools: ['list_templates', 'email_creation_by_website_and_template', 'list_how_to_generate_a_proposal', 'pinecone_company_knowledge_semantic_search', 'pinecone_email_templates_semantic_search', 'pinecone_faq_data_semantic_search'],
      },
      {
        id: 'steve',
        name: 'Steve',
        description: 'Leadership Agent - Leverages CliftonStrengths and employee profiles for team development',
        capabilities: ['web-search', 'team-collaboration', 'standup-facilitation', 'performance-improvement'],
        tools: ['pinecone_add_transcript_data_to_index', 'pinecone_company_knowledge_semantic_search', 'pinecone_employee_data_semantic_search', 'pinecone_transcript_data_semantic_search', 'web_search'],
      },
      {
        id: 'atlas',
        name: 'Atlas',
        description: 'Business Intelligence Agent - Conducts website analysis.',
        capabilities: ['web-search', 'website-analysis', 'competitive-intelligence', 'strategic-recommendations'],
        tools: ['analyze_website', 'deep_research'],
      },
      {
        id: 'juno',
        name: 'Juno',
        description: 'Data Integration Agent - Connects to Metabase for comprehensive data analytics',
        capabilities: ['web-search', 'data-analytics', 'metabase-integration', 'decision-support'],
        tools: ['web_search'],
      },
      {
        id: 'dope-admin',
        name: 'Dope Admin',
        description: 'Dope Marketing Admin Agent - Helps the engineer complete any tasks and is helpful overall.',
        capabilities: ['web-search', 'admin-support'],
        tools: ['web_search', 'pinecone_list_indexes', 'pinecone_create_index', 'pinecone_add_to_index', 'pinecone_add_employee_data_to_index', 'pinecone_add_transcript_data_to_index', 'pinecone_semantic_search'],
      },
    ];

    return NextResponse.json({
      success: true,
      data: agents,
    });
  } catch (error) {
    console.error('Error fetching chat agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
