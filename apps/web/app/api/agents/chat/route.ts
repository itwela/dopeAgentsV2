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
import { setTracingExportApiKey } from '@openai/agents';
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
  instructions: `You are a market research analyst specializing in geographic and demographic analysis for local service businesses. 
        
Analyze ZIP code demographic data and provide actionable strategic insights. Focus on:
- Market size and opportunity
- Customer segmentation and targeting  
- Pricing strategies based on income data
- Service area prioritization
- Marketing recommendations
- Growth opportunities

Provide concrete, data-driven recommendations. If you don't have access to real-time data, provide the best analysis possible with available information and clearly note what data would be needed for more precise recommendations. Do not ask questions - just provide the analysis.`,
 model: 'gpt-5-mini',
 tools: [webSearchTool()],
 modelSettings: { parallelToolCalls: true }
});

const businessDataExtractionAgent = new Agent({
  name: 'BusinessDataExtraction',
  instructions: `You are a business data extraction agent. Extract comprehensive business data from websites and provide detailed analysis.

  Extract all relevant business data including: services, markets served, value proposition, differentiators, target customers, trust signals, testimonials, pricing, CTAs, contact methods, locations, social links, headlines, SEO keywords, blog/news titles, FAQs, and technologies mentioned.
  
  Be thorough, detailed, and provide actionable insights. Do not ask questions - just extract and analyze the data provided.`,
  tools: [webSearchTool()],
  model: "gpt-5-mini",
  modelSettings: { parallelToolCalls: true }
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
  
  Using the business data and market analysis provided, create 3 compelling outreach email options that:
  1. Demonstrate deep understanding of the client's business and market
  2. Incorporate specific insights from website research and demographic data
  3. Follow Dope Marketing's voice and formatting standards
  4. Include clear CTAs that drive immediate action
  
  Return all 3 email options with Subject, Preview, Body, and Signoff for each. Do not ask questions - just create the emails based on the provided data.`,
  tools: [],
  model: "gpt-5-mini",
  modelSettings: { parallelToolCalls: false }
});


/* ------------------------------------------------------------------------------------------------

TOOL KEY-PAIR MAPPINGS

-------------------------------------------------------------------------------------------------- */

// Tool display names mapping for cleaner user interface
const TOOL_DISPLAY_NAMES = {
  // Email & Proposal Tools
  'list_templates': '📧 Email Templates',
  'list_how_to_generate_a_proposal': '📋 Proposal Guide',
  'in_depth_business_analysis': '🔍 Business Analysis',
  
  // Leadership & Team Tools
  'facilitate_standup': '👥 Standup Meetings',
  
  // Pinecone Database Tools
  'pinecone_list_indexes': '🗂️ DOPE List Indexes',
  'pinecone_create_index': '➕ DOPE Create Index',
  'pinecone_add_to_index': '📝 DOPE Add Data',
  'pinecone_add_employee_data_to_index': '👤 DOPE Add Employee Data',
  'pinecone_add_transcript_data_to_index': '📄 DOPE Add Transcript',
  'pinecone_semantic_search': '🔎 DOPE Semantic Search',
  
  // Specialized Pinecone Searches
  'pinecone_company_knowledge_semantic_search': '🏢 DOPE Company Knowledge',
  'pinecone_employee_data_semantic_search': '👥 DOPE Employee Profiles',
  'pinecone_transcript_data_semantic_search': '📝 DOPE Transcript Search',
  'pinecone_email_templates_semantic_search': '📧 DOPE Email Templates Search',
  'pinecone_faq_data_semantic_search': '❓ DOPE FAQ Search',
  
  // Account Management
  'dope_active_account_lookup': '📊 Account Lookup',
  'dope_active_account_upsert': '➕ Add Account Data',
  
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

const inDepthBusinessAnalysisTool = tool({
  name: 'in_depth_business_analysis',
  description: 'Perform comprehensive business analysis. Return the complete analysis with all agent outputs - business research, market analysis, and email options. CRITICAL: Do not summarize, condense, or format the agent outputs. Return them exactly as the agents produced them. Do not add commentary, explanations, or formatting. Just return the raw agent outputs.',
  parameters: z.object({
    websiteName: z.string().describe('The website to use for scraping'),
    businessZipCode: z.string().describe('The business zip code to use for market analysis'),
    businessName: z.string().optional().nullable().describe('The business name to use'),
    primaryContactName: z.string().optional().nullable().describe('Primary contact name for the business (e.g., Jane Doe)'),
  }),

  execute: async (input) => {

    const { websiteName, businessZipCode, businessName, primaryContactName } = input;
    

    const businessAnalizerPrompt = `
    I need you to build a business strategy for this business.

    - Research their website and identify all services they offer specifically for the fall season. Do NOT include any winter services.
    - Be exhaustive in your research so I can appear as an expert in the business's service area.
    - Highlight the services and areas that the business owner would recognize, and help me position myself as an expert for targeting these specific areas for the business's services.

    ${websiteName ? `- Research the website: ${websiteName}` : ''}
    `;
    
    // research business Data
    console.log(`[inDepthBusinessAnalysisTool] Running BusinessDataExtraction agent for website: ${websiteName}`);
    const analysisStartTime = Date.now();
    const analysisResult = await run(businessDataExtractionAgent, [user(businessAnalizerPrompt)], { maxTurns: 3 });
    const analysisDuration = Date.now() - analysisStartTime;
    const extractBusinessData = analysisResult.finalOutput || 'Analysis could not be completed';
    console.log(`[inDepthBusinessAnalysisTool] BusinessDataExtraction agent completed in ${analysisDuration}ms, output length: ${extractBusinessData.length} characters`);

    const promptForZipcodeAnalysis = `
    Please analyze the area within a 20 mile radius of the business's office location. Your analysis MUST include these four specific strategies:

    1. **"MTV Cribs" (Affluent Homes)**: Identify the top 5-20% of ZIP codes or specific neighborhoods with the highest home values. List specific neighborhood names, median home values, and why these areas are ideal for targeting affluent homeowners.

    2. **"Heavy Movers" (High-Turnover Areas)**: Identify the ZIP codes with the most homes being bought and sold (highest turnover rate). These are areas where homeowners are likely to need services after moving in. Include turnover rates and specific neighborhoods if available.

    3. **"The Sweet Spot" (Older, Valuable Homes)**: Identify areas with older homes (15+ years old) that are still in the top 20% of median home value. These homes often need renovation, maintenance, or upgrades. List specific neighborhoods, average home age, and median values.

    4. **"Neighborhood Reactivation"**: Include this standard paragraph: "Dope Marketing's Neighborhood Reactivation strategy involves mailing postcards to homes surrounding your recently completed jobs. Neighbors who see your crew working are 10x more likely to call. We can launch a targeted campaign around your last 10-50 jobs with no minimums, proof approval, and mail out in under 5 days."

    Be exhaustive and specific in your search for ZIP codes and neighborhoods. Highlight well-known neighborhoods or areas that a local business owner would recognize, so the analysis appears highly knowledgeable about the service area.

    Here is the business's zip code: ${businessZipCode}
    `
    // run zipcode analysis
    console.log(`[inDepthBusinessAnalysisTool] Running MarketAnalyst agent for zip code: ${businessZipCode}`);
    const zipCodeStartTime = Date.now();
    const zipCodeAnalysisResult = await run(zipCodeAnalysisAgent, [user(promptForZipcodeAnalysis)], { maxTurns: 3 });
    const zipCodeDuration = Date.now() - zipCodeStartTime;
    const zipCodeAnalysis = zipCodeAnalysisResult.finalOutput || 'Analysis could not be completed';
    console.log(`[inDepthBusinessAnalysisTool] MarketAnalyst agent completed in ${zipCodeDuration}ms, output length: ${zipCodeAnalysis.length} characters`);
    
    // run email creation with combined context
    const emailCreationPrompt = `
    BUSINESS DATA:
    ${extractBusinessData}

    MARKET ANALYSIS (INCLUDING 4 KEY STRATEGIES):
    ${zipCodeAnalysis}

    WHO IS DOPE MARKETING:
    ${whoIsDopeMarketing}

    DOPE VOICE & STYLE:
    ${dopeVoice}

    Based on the above business data, market analysis (including MTV Cribs, Heavy Movers, Sweet Spot, and Neighborhood Reactivation strategies), and Dope Marketing's positioning, create 3 tailored outreach email options for this business.

    Each email should:
    - Reference specific insights from the business research and market analysis
    - Weave in at least one of the four targeting strategies naturally
    - Follow Dope Marketing's voice guidelines exactly
    - Include a clear, reply-based CTA
    - Feel personalized and data-driven, not generic

    ${primaryContactName ? `- The primary contact name is ${primaryContactName}` : ''}
    `;
    
    console.log(`[inDepthBusinessAnalysisTool] Running EmailCreation agent`);
    const emailStartTime = Date.now();
    const emailCreationResult = await run(emailCreationAgent, [user(emailCreationPrompt)], { maxTurns: 1 });
    const emailDuration = Date.now() - emailStartTime;
    const emailCreation = emailCreationResult.finalOutput || 'Email creation could not be completed';
    console.log(`[inDepthBusinessAnalysisTool] EmailCreation agent completed in ${emailDuration}ms, output length: ${emailCreation.length} characters`);
    
    // Construct comprehensive analysis output with individual agent outputs
    const comprehensiveAnalysis = `
    # 📊 In-Depth Business Analysis Complete

    **Analysis generated by Hermes for ${businessName || 'Client'}**  
    **Agents Used:** BusinessDataExtraction → MarketAnalyst → EmailCreation  
    **Generated:** ${new Date().toLocaleString()}

    ---

    ## 🔍 Business Data Extraction Results
    **Agent:** BusinessDataExtraction  
    **Status:** ✅ Complete  
    **Output Length:** ${extractBusinessData.length} characters
    
    ${extractBusinessData}

    ---

    ## 📊 Market Analysis Results  
    **Agent:** MarketAnalyst  
    **Status:** ✅ Complete  
    **Output Length:** ${zipCodeAnalysis.length} characters
    
    ${zipCodeAnalysis}

    ---

    ## 📧 Email Creation Results
    **Agent:** EmailCreation  
    **Status:** ✅ Complete  
    **Output Length:** ${emailCreation.length} characters
    
    ${emailCreation}

    ---

    ## 📋 Executive Summary
    **Total Analysis Size:** ${(extractBusinessData.length + zipCodeAnalysis.length + emailCreation.length).toLocaleString()} characters  
    **Agent Pipeline:** 3 agents executed successfully  
    **Execution Times:** BusinessDataExtraction: ${analysisDuration}ms | MarketAnalyst: ${zipCodeDuration}ms | EmailCreation: ${emailDuration}ms  
    **Total Processing Time:** ${(analysisDuration + zipCodeDuration + emailDuration)}ms  
    **Ready for Client Review:** ✅ Yes
    `;
    
    console.log(`[inDepthBusinessAnalysisTool] Analysis complete. Total output length: ${comprehensiveAnalysis.length} characters`);
    
    return {
      success: true,
      completeAnalysis: comprehensiveAnalysis,
      businessData: extractBusinessData,
      marketAnalysis: zipCodeAnalysis,
      emailOptions: emailCreation,
      executionMetrics: {
        businessDataExtraction: {
          duration: analysisDuration,
          outputLength: extractBusinessData.length,
          status: 'completed'
        },
        marketAnalysis: {
          duration: zipCodeDuration,
          outputLength: zipCodeAnalysis.length,
          status: 'completed'
        },
        emailCreation: {
          duration: emailDuration,
          outputLength: emailCreation.length,
          status: 'completed'
        },
        totalDuration: analysisDuration + zipCodeDuration + emailDuration,
        totalOutputLength: extractBusinessData.length + zipCodeAnalysis.length + emailCreation.length
      }
    };

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
  description: 'Lookup a Dope Active Account by account name and return monthly sends.',
  parameters: z.object({
    account_name: z.string().describe('Exact account name to look up, e.g., Coconut Cleaning'),
  }),
  execute: async (input) => {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const doc = await convex.query(convexApi.threads.getDopeActiveAccountByName, { account_name: input.account_name });
    if (!doc) {
      return { found: false };
    }
    return { found: true, account: doc };
  }
});

// Add/Update Dope Active Account data
const dopeActiveAccountUpsertTool = tool({
  name: 'dope_active_account_upsert',
  description: 'Add or update a Dope Active Account with monthly send data.',
  parameters: z.object({
    account_name: z.string().describe('Account name, e.g., Coconut Cleaning'),
    account_id: z.string().nullable().optional().describe('Account ID'),
    hubspot_id: z.string().nullable().optional().describe('HubSpot ID'),
    industry: z.string().nullable().optional().describe('Industry'),
    Jan_2025: z.string().nullable().optional().describe('January 2025 sends'),
    Feb_2025: z.string().nullable().optional().describe('February 2025 sends'),
    Mar_2025: z.string().nullable().optional().describe('March 2025 sends'),
    Apr_2025: z.string().nullable().optional().describe('April 2025 sends'),
    May_2025: z.string().nullable().optional().describe('May 2025 sends'),
    Jun_2025: z.string().nullable().optional().describe('June 2025 sends'),
    Jul_2025: z.string().nullable().optional().describe('July 2025 sends'),
    Aug_2025: z.string().nullable().optional().describe('August 2025 sends'),
    Sep_2025: z.string().nullable().optional().describe('September 2025 sends'),
    Oct_2025: z.string().nullable().optional().describe('October 2025 sends'),
    Nov_2025: z.string().nullable().optional().describe('November 2025 sends'),
    Dec_2025: z.string().nullable().optional().describe('December 2025 sends'),
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

    If you are directed to analyze a business, please use the in_depth_business_analysis tool to analyze the business.
    
    CRITICAL: When using the in_depth_business_analysis tool, do NOT summarize, condense, or reformat the agent outputs. Return them exactly as they are produced. Do not add your own commentary, explanations, or formatting. The tool will return the raw agent outputs and you should present them as-is.
  
  
  FORMATTING RULES (APPLY THESE WHEN WRITING RESPONSES):
  ${STYLE_GUIDE_PROMPT_HERMES}
  `,
  handoffDescription: 'Hermes - Account Manager Assistant - Uses tools to help the account manager with account management.',
  tools: [listTemplatesTool, 
    inDepthBusinessAnalysisTool, dopeActiveAccountLookupTool, dopeActiveAccountUpsertTool,
    listHowToGenerateAProsal, 
    pineconeCompanyKnowledgeSemanticSearchTool, 
    pineconeEmailTemplatesSemanticSearchTool, 
    pineconeTranscriptDataSemanticSearchTool, 
    pineconeFaqDataSemanticSearchTool, webSearchTool()],
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
  tools: [facilitateStandupTool, pineconeAddTranscriptDataToIndexTool, pineconeCompanyKnowledgeSemanticSearchTool, pineconeEmployeeDataSemanticSearchTool, pineconeTranscriptDataSemanticSearchTool, webSearchTool()],
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

    // If the in_depth_business_analysis tool was used and returned a completeAnalysis,
    // immediately append it as the next assistant message in the thread without changing
    // the primary response payload.
    let comprehensiveAnalysisContent: string | null = null;
    try {
      const analysisCall = toolCalls.find((tc) => tc.name === 'in_depth_business_analysis');
      if (analysisCall && analysisCall.result && typeof analysisCall.result.completeAnalysis === 'string') {
        comprehensiveAnalysisContent = analysisCall.result.completeAnalysis as string;
      }
    } catch (_) {
      // noop — do not affect normal flow if parsing fails
    }

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
          // Handle inDepthBusinessAnalysisTool - create separate messages for each agent output
          if (tc.name === 'in_depth_business_analysis') {
            // First, show the comprehensive analysis as the main result
            if (resultContent.completeAnalysis) {
              messages.push({
                role: 'assistant',
                content: `🎯 **Complete Business Analysis Pipeline**\n\n${resultContent.completeAnalysis}`,
                timestamp: Date.now(),
                agentName: 'Hermes',
              });
            }
            
            // Then show individual agent outputs for detailed review
            if (resultContent.businessData) {
              messages.push({
                role: 'assistant',
                content: `🔍 **Business Data Extraction Results**\n\n**Agent:** BusinessDataExtraction\n**Status:** ✅ Complete\n**Task:** Website research and business data extraction\n\n${resultContent.businessData}`,
                timestamp: Date.now(),
                agentName: 'BusinessDataExtraction',
              });
            }
            if (resultContent.marketAnalysis) {
              messages.push({
                role: 'assistant',
                content: `📊 **Market Analysis Results**\n\n**Agent:** MarketAnalyst\n**Status:** ✅ Complete\n**Task:** ZIP code demographic analysis and market insights\n\n${resultContent.marketAnalysis}`,
                timestamp: Date.now(),
                agentName: 'MarketAnalyst',
              });
            }
            if (resultContent.emailOptions) {
              messages.push({
                role: 'assistant',
                content: `📧 **Email Creation Results**\n\n**Agent:** EmailCreation\n**Status:** ✅ Complete\n**Task:** Generate tailored outreach email options\n\n${resultContent.emailOptions}`,
                timestamp: Date.now(),
                agentName: 'EmailCreation',
              });
            }
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
      },
      // Append comprehensive analysis as its own assistant message if present
      ...(comprehensiveAnalysisContent ? [{
        role: 'assistant' as const,
        content: comprehensiveAnalysisContent,
        timestamp: Date.now(),
        agentName: result.lastAgent?.name || currentAgent.name,
      }] : [])
    ];

    // Save to Convex - generate/set title automatically
    if (currentThreadId) {
      if (savedMessages.length === 0) {
        // Create new thread with a temporary title
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
        description: 'Account Manager Assistant - Utilizes templates and company information to generate tailored proposals, analyze markets, and support account management',
        capabilities: ['web-search', 'proposal-generation', 'client-analysis', 'sales-support', 'market-analysis', 'demographic-insights'],
        tools: [
          'web_search',
          //'list_templates', 
          'in_depth_business_analysis', 
          'pinecone_company_knowledge_semantic_search', 
          //'pinecone_email_templates_semantic_search', 
          'pinecone_transcript_data_semantic_search', 
          //'pinecone_faq_data_semantic_search', 
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
          'pinecone_add_transcript_data_to_index', 
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
