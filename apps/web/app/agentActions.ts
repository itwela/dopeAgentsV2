import Firecrawl from "@mendable/firecrawl-js";
import { z } from "zod";

const firecrawl = new Firecrawl({
    apiKey:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY
        : process.env.FIRECRAWL_API_KEY,
  });

function quickFormatUrl(url: string): string {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "https://" + url;
    }
    return url;
}

async function analyzeWebsiteViaFirecrawl(url: string, analysisType: 'content' | 'gather-style-of-speaking') {

    const formattedUrl = quickFormatUrl(url);

    // Define the structured schema we want from any website with content type
    const WebsiteSummarySchema = z.object({
      summaryOfTheBusiness: z.string().describe("A summary of the business, go into detail as much as possible."),
      aboutTheBusiness: z.string().describe("About the business; useful background for understanding the company."),
      servicesOffered: z.string().describe("Services they offer with details."),
      whereTheyServe: z.string().describe("Where they serve, geography/markets."),
    });

    // Define the structured schema we want from any website with gather-style-of-speaking type
    const GatherStyleOfSpeakingSchema = z.object({
      toneAndVoice: z.string().describe("The overall tone and voice of the website - formal, casual, professional, friendly, authoritative, conversational, etc."),
      writingStyle: z.string().describe("The writing style characteristics - sentence structure, paragraph length, use of technical jargon, storytelling approach, etc."),
      languagePatterns: z.string().describe("Specific language patterns, vocabulary choices, industry terminology, colloquialisms, and recurring phrases or expressions."),
      communicationApproach: z.string().describe("How they communicate with their audience - direct vs indirect, educational vs promotional, problem-focused vs solution-focused, etc."),
      emotionalTone: z.string().describe("The emotional undertone of the content - enthusiastic, empathetic, urgent, reassuring, confident, humble, etc."),
      brandPersonality: z.string().describe("The personality that comes through in the writing - innovative, traditional, rebellious, trustworthy, cutting-edge, established, etc."),
      rhetoricalDevices: z.string().describe("Use of questions, calls-to-action, testimonials, statistics, storytelling, metaphors, or other persuasive techniques."),
      audienceAddressing: z.string().describe("How they address their audience - formal titles, first person, second person, inclusive language, industry-specific addressing, etc."),
      contentStructure: z.string().describe("How they organize and present information - bullet points, numbered lists, headers, short vs long-form content, etc."),
      examplePhrases: z.array(z.string()).describe("Specific example phrases, sentences, or word choices that exemplify their style of communication."),
    });

    let schema: z.ZodSchema;
    let prompt: string;
    let systemPrompt: string;

    if (analysisType === 'gather-style-of-speaking') {
      schema = GatherStyleOfSpeakingSchema;
      prompt = "Extract the style of speaking of the website.";
      systemPrompt = "You are a helpful assistant that extracts the style of speaking of the website.";
    } else {
      schema = WebsiteSummarySchema;
      prompt = "Extract the summary of the business, about the business, services offered, and where they serve.";
      systemPrompt = "You are a helpful assistant that extracts the summary of the business, about the business, services offered, and where they serve.";
    }

    // Use Firecrawl Extract with schema. We keep scrapeOptions lean for speed; limit is not used by extract directly.
    const extraction = await firecrawl.extract([formattedUrl], {
      schema: schema,
      scrapeOptions: {
        onlyMainContent: true,
      },
      prompt: prompt,
      systemPrompt: systemPrompt,
      showSources: true,
      includeSubdomains: true,
      enableWebSearch: false,
    });

    const structured = (extraction as any)?.data as z.infer<typeof WebsiteSummarySchema> | undefined;

    const payload = {
      success: true,
      source: { url: formattedUrl, fetchedAt: new Date().toISOString() },
      contentType: "json" as const,
      // Keep a string content for backwards compatibility, but prefer `structured` downstream
      content: structured ? JSON.stringify(structured) : "",
      structured,
    } as const;

    return payload;
}

async function deepResearchAnything(researchQuery: string, websiteUrl?: string) {

  // Create completely flexible schema for ANY research topic
  const UniversalResearchSchema = z.object({
    query: z.string().describe("The research question that was answered"),
    keyFindings: z.string().describe("The main findings and insights from the research"),
    detailedAnalysis: z.string().describe("Comprehensive analysis addressing the specific query"),
    supporting_evidence: z.string().describe("Specific evidence, data, sources, and examples found during research"),
    conclusions: z.string().describe("Conclusions and insights drawn from the research"),
    actionableInsights: z.string().describe("Practical, actionable insights relevant to the query"),
    relatedTopics: z.string().describe("Related topics or areas for further research"),
    fullReportMarkdown: z.string().describe("Complete research report in well-structured Markdown format addressing the specific query")
  });

  // If a website is provided, include it in the query, otherwise research the topic generally
  const query = websiteUrl 
    ? `${researchQuery} - Include analysis of this website: ${quickFormatUrl(websiteUrl)}`
    : researchQuery;
  
  const analysisPrompt = `${researchQuery}

Conduct thorough, comprehensive research to answer this query. Use all available sources and provide detailed, evidence-based analysis. Structure your response to directly address the question with supporting evidence and actionable insights.

Be comprehensive and include:
- Specific examples and data
- Multiple perspectives when relevant  
- Current and up-to-date information
- Actionable conclusions
- Clear, well-organized analysis

${websiteUrl ? 'Include specific analysis of the provided website as a primary source.' : 'Research broadly using all available sources.'}`;

  const systemPrompt = "You are a senior research analyst capable of researching any topic thoroughly. Provide comprehensive, evidence-based analysis that directly addresses the research query. Be precise, detailed, and focus on actionable insights.";

  const research = await firecrawl.deepResearch(query, {
    maxDepth: 5,
    timeLimit: 300,
    maxUrls: websiteUrl ? 15 : 25, // More URLs if no specific website
    analysisPrompt: analysisPrompt,
    systemPrompt: systemPrompt,
    formats: ["markdown", "json"],
    jsonOptions: {
      schema: UniversalResearchSchema,
      systemPrompt: "Return comprehensive research results in valid JSON format. Address the specific research query thoroughly in each field.",
      prompt: "Provide detailed, well-researched answers in each field. The fullReportMarkdown should be a complete, professional research report.",
    },
  });

  return research;

}

export { analyzeWebsiteViaFirecrawl, deepResearchAnything };