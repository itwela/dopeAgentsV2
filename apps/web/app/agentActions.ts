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
      // Core
      summaryOfTheBusiness: z.string().describe("A comprehensive summary of the business and what they do."),
      aboutTheBusiness: z.string().describe("Background information about the company (history, mission, values)."),
      servicesOffered: z.string().describe("Services they offer with details and examples."),
      whereTheyServe: z.string().describe("Where they serve, geography/markets."),

      // Differentiation & audience
      valueProposition: z.string().describe("Clear value proposition and benefits they promise to customers."),
      keyDifferentiators: z.array(z.string()).describe("Key differentiators vs competitors (unique features, guarantees, speed, pricing, specialization)."),
      targetCustomers: z.string().describe("Target audience, industries served, and ideal customer profiles."),

      // Trust & proof
      trustSignals: z.array(z.string()).describe("Trust signals such as certifications, case studies, social proof, partnerships."),
      testimonials: z.array(z.string()).describe("Representative testimonials or review highlights."),
      notableClients: z.array(z.string()).describe("Notable clients or logos mentioned."),
      awardsOrPress: z.array(z.string()).describe("Awards, media features, or notable press mentions."),

      // Pricing & offers
      pricingOrOffers: z.string().describe("Any pricing information, free trials, discounts, or promotions."),

      // Calls-to-action & contact
      primaryCallToActions: z.array(z.string()).describe("Primary calls-to-action (CTA) text and contexts (e.g., 'Get a Quote', 'Book a Demo')."),
      contactMethods: z.array(z.string()).describe("Contact methods found (phone, email, forms, chat) and any key details."),
      locations: z.array(z.string()).describe("Physical locations, service areas, or addresses if listed."),
      socialLinks: z.array(z.string()).describe("Links to social profiles (Facebook, LinkedIn, Instagram, etc.)."),

      // Content structure & SEO
      topServices: z.array(z.string()).describe("Top service categories or key offerings highlighted on the site."),
      exampleHeadlines: z.array(z.string()).describe("Representative headlines or copy snippets that capture positioning."),
      seoKeywords: z.array(z.string()).describe("Likely SEO keywords/phrases inferred from content."),
      recentBlogPosts: z.array(z.string()).describe("Recent blog/news post titles if present."),
      faqs: z.array(z.string()).describe("Frequently asked questions or common topics addressed."),
      technologiesOrPlatforms: z.array(z.string()).describe("Technologies, platforms, or integrations mentioned (e.g., Shopify, HubSpot)."),
    });

    // Define the structured schema we want from any website with gather-style-of-speaking type
    const GatherStyleOfSpeakingSchema = z.object({
      toneAndVoice: z.string().describe("The overall tone and voice (formal, casual, professional, friendly, authoritative, conversational, etc.)."),
      writingStyle: z.string().describe("Style characteristics (sentence structure, paragraph length, jargon level, storytelling approach)."),
      languagePatterns: z.string().describe("Vocabulary choices, industry terminology, recurring phrases, and patterns."),
      communicationApproach: z.string().describe("Direct vs indirect, educational vs promotional, problem vs solution-focused, etc."),
      emotionalTone: z.string().describe("Emotional undertone (enthusiastic, empathetic, urgent, reassuring, confident, humble, etc.)."),
      brandPersonality: z.string().describe("Brand personality traits (innovative, traditional, trustworthy, cutting-edge, etc.)."),
      rhetoricalDevices: z.string().describe("Use of questions, CTAs, testimonials, statistics, storytelling, metaphors, etc."),
      audienceAddressing: z.string().describe("How they address readers (first/second person, inclusive language, titles)."),
      contentStructure: z.string().describe("Organization conventions (bullets, numbered lists, headers, short vs long-form)."),
      examplePhrases: z.array(z.string()).describe("Representative phrases/sentences that capture the voice."),
      audiencePersona: z.string().describe("Who they seem to be speaking to (roles, industries, sophistication)."),
      brandValues: z.array(z.string()).describe("Core values emphasized in copy (quality, speed, transparency, sustainability, etc.)."),
      formattingConventions: z.array(z.string()).describe("Notable formatting (emoji usage, capitalization, punctuation style)."),
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
      prompt = "Extract a comprehensive, structured profile of the business suitable for highly personalized outreach. Include summary, about, services, markets served, value proposition, key differentiators, target customers, trust signals, testimonials, notable clients, awards/press, pricing or offers, primary CTAs, contact methods, locations, social links, top services, example headlines, likely SEO keywords, recent blog/news titles, FAQs, and technologies/platforms mentioned.";
      systemPrompt = "You are a helpful assistant that extracts a detailed business profile optimized for sales/marketing personalization. Provide thorough, concise, factual information strictly from the website content.";
    }

    // Use Firecrawl Extract with schema. We keep scrapeOptions lean for speed; limit is not used by extract directly.
    let extraction: unknown;
    try {
      extraction = await firecrawl.extract([formattedUrl], {
        schema: schema,
        scrapeOptions: {
          onlyMainContent: true,
        },
        prompt: prompt,
        systemPrompt: systemPrompt,
        showSources: true,
        includeSubdomains: true,
        enableWebSearch: false,
      } as any);
    } catch (err) {
      // Deep error serialization to find the real error details
      const deepSerialize = (obj: any, depth = 0): string => {
        if (depth > 3) return '[Max depth reached]';
        if (obj === null) return 'null';
        if (typeof obj !== 'object') return String(obj);
        
        try {
          const result: string[] = [];
          for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
              result.push(`${key}: ${deepSerialize(value, depth + 1)}`);
            } else {
              result.push(`${key}: ${String(value)}`);
            }
          }
          return `{${result.join(', ')}}`;
        } catch {
          return '[Circular or unstringifiable]';
        }
      };

      const respData = (err as any)?.response?.data ?? (err as any)?.data;
      const errorDetails = (err as any)?.error ?? (err as any)?.details;
      const readable = [
        `name: ${(err as any)?.name || 'Error'}`,
        `message: ${(err as any)?.message || 'Unknown Firecrawl error'}`,
        respData ? `response.data: ${deepSerialize(respData)}` : undefined,
        errorDetails ? `error.details: ${deepSerialize(errorDetails)}` : undefined,
        `fullError: ${deepSerialize(err)}`,
        `stack: ${(err as any)?.stack || ''}`,
      ].filter(Boolean).join('\n');

      console.error("[Firecrawl.extract] Failed", {
        url: formattedUrl,
        analysisType,
        nodeEnv: process.env.NODE_ENV,
        readable,
      });

      return {
        success: false as const,
        source: { url: formattedUrl, fetchedAt: new Date().toISOString() },
        contentType: "error" as const,
        error: readable,
        structured: undefined,
      } as const;
    }

    const structured = (extraction as any)?.data as z.infer<typeof WebsiteSummarySchema> | undefined;

    const payload = {
      success: true as const,
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

  let research;
  try {
    research = await firecrawl.deepResearch(query, {
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
  } catch (err) {
    console.error("[Firecrawl.deepResearch] Failed", {
      query,
      websiteUrl: websiteUrl ? quickFormatUrl(websiteUrl) : undefined,
      nodeEnv: process.env.NODE_ENV,
      errorName: (err as Error)?.name,
      errorMessage: (err as Error)?.message,
      errorStack: (err as Error)?.stack,
    });
    throw new Error(`Firecrawl deepResearch failed: ${(err as Error)?.message}`);
  }

  return research;

}

export { analyzeWebsiteViaFirecrawl, deepResearchAnything };