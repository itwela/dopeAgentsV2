import { tool } from "@openai/agents";
import { addEmployeeDataToIndex, addToIndex, addTranscriptDataToIndex, createIndex, listIndexesFromPinecone, semanticSearch } from '../services/pineconeService';
import { z } from "zod";
import { ConvexHttpClient } from "convex/browser";
import { api as convexApi } from "../convex/_generated/api";
import { INDEX_TYPES } from "../types/metadata";


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

// ------------------------------------------------------------- ------------

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
const pineconeTranscriptDataSemanticSearchTool = tool({
    name: 'pinecone_transcript_data_semantic_search',
    description: 'Perform semantic search on the dope-transcript-data index',
    parameters: z.object({
        query: z.string().describe('The query text to search for'),
    }),
    execute: async (input) => {
        const { query } = input;
        return await semanticSearch('dope-transcript-data', { query, topK: 10, namespace: '__default__', fields: undefined });
    },
});
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

// Get Workflow Context Tool
const getWorkflowContextTool = tool({
    name: 'get_workflow_context',
    description: 'Fetch the complete analysis and context from a workflow run. Use this when the user is discussing a specific client or workflow and you need detailed information about the workflow steps and results.',
    parameters: z.object({
        workflowRunId: z.string().describe('The workflow run ID to fetch context for'),
    }),
    execute: async (input) => {
        const { workflowRunId } = input;
        const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
        
        try {
            const workflowResults = await convex.query(convexApi.threads.getWorkflowResults, { workflowRunId });
            
            if (!workflowResults || workflowResults.length === 0) {
                return `No workflow results found for workflow ID: ${workflowRunId}`;
            }
            
            // Format the workflow results into a readable context
            const formattedContext = workflowResults.map(result => {
                return `## Step ${result.stepNumber}: ${result.stepTitle}\n\n${result.response}`;
            }).join('\n\n---\n\n');
            
            return `# Workflow Analysis Results\n\n${formattedContext}`;
        } catch (error) {
            console.error('Error fetching workflow context:', error);
            return `Error fetching workflow context: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    },
});

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
const whoIsDopeMarketing = `
    Who is DOPE Marketing?

    At its core, DOPE Marketing operates on a single, powerful principle: **meet customers where they're at.** Founded by CEO Dave Carroll, DOPE is a marketing technology company that has revolutionized direct mail by making it simple, data-driven, and highly effective for businesses of all sizes. Our mission is to help our clients get **better jobs in the right neighborhoods for less money that convert higher.**

    The name "DOPE" isn't just a brand; it's our methodology: **Data On Previous Engagement.** We built a full SaaS platform and a 40,000 sq. ft. print facility to control the entire process, using a business's own customer data to develop targeted strategies that take the guesswork out of advertising.

    While we are a leader in the print industry, our strategic focus is on growing our software subscriptions and becoming the undisputed leader in marketing technology for local and home service businesses.

    Key Features & The DOPE System:

    *   **Data-Driven Direct Mail:** We use your past customer data to find more customers just like them. Our core offerings include automated postcards, handwritten notes, and gifts triggered directly from your CRM.
    *   **Powerful Software Tools:** Features like **Neighborhood Blitz** for hyperlocal targeting, a new **Homebuyer Feed**, and the upcoming **DOPE Pixel** for website retargeting allow for precise campaigns that were once impossible.
    *   **Seamless CRM Integrations:** We connect with GoHighLevel, Zapier, Salesforce, HubSpot, and more to make your marketing run on autopilot.
    *   **End-to-End Control:** By owning both the software and the print shop, we guarantee a seamless customer journey from strategy and design to production and delivery, with no minimum orders.
    *   **Full-Service Print Shop:** Beyond mail, we are a one-stop shop for yard signs, door hangers, business cards, and other essential marketing materials.

    DOPE Marketing is on a mission to hit $1 million in monthly recurring revenue (MRR) by becoming a predictable, scalable, and disciplined growth partner for our clients. We aren't just a vendor; we are the engine that makes your marketing work.
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
  
  // Workflow Tools
  'get_workflow_context': '🔄 Get Workflow Context',
  
  // Web Tools
  'web_search': '🌐 Web Search',
  
  // Attom MCP Tools
  'attom_list_collections': '🗄️ Attom Collections',
  'attom_find': '🔍 Attom Find',
  'attom_aggregate': '📊 Attom Aggregate',
  'attom_collection_schema': '📋 Attom Schema',
  
  // CRM MCP Tools
  'crm_list_collections': '🗄️ CRM Collections',
  'crm_find': '🔍 CRM Find',
  'crm_aggregate': '📊 CRM Aggregate',
  'crm_collection_schema': '📋 CRM Schema',
  
  // Dope Core MCP Tools (PostgreSQL)
  'dope_core_list_tables': '🗄️ Dope Core Tables',
  'dope_core_query': '🔍 Dope Core Query',
  'dope_core_describe_table': '📋 Dope Core Schema',
  'dope_core_list_databases': '💾 Dope Core Databases',
  
  // Generic MongoDB MCP Tools (for backward compatibility)
  'mongodb_list_collections': '🗄️ List Collections',
  'mongodb_find': '🔍 Find Documents',
  'mongodb_aggregate': '📊 Aggregate Data',
  'mongodb_collection_schema': '📋 Collection Schema',
  'mongodb_insert': '➕ Insert Document',
  'mongodb_update': '✏️ Update Document',
  'mongodb_delete': '🗑️ Delete Document',
};

// Function to get display name for a tool
const getToolDisplayName = (toolName: string): string => {
    return TOOL_DISPLAY_NAMES[toolName as keyof typeof TOOL_DISPLAY_NAMES] || toolName;
};



export { listTemplatesTool, listHowToGenerateAProsal, facilitateStandupTool, pineconeListIndexesTool, pineconeCreateIndexTool, pineconeAddEmployeeDataToIndexTool, pineconeAddTranscriptDataToIndexTool, pineconeAddToIndexTool, pineconeSemanticSearchTool, pineconeCompanyKnowledgeSemanticSearchTool, pineconeEmployeeDataSemanticSearchTool, pineconeTranscriptDataSemanticSearchTool, pineconeEmailTemplatesSemanticSearchTool, pineconeFaqDataSemanticSearchTool, dopeActiveAccountLookupTool, dopeActiveAccountUpsertTool, getWorkflowContextTool, TOOL_DISPLAY_NAMES, STYLE_GUIDE_PROMPT_HERMES, whoIsDopeMarketing, dopeVoice, howToGenerateAProsal, getToolDisplayName };
