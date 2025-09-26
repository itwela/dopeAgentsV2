import { NextResponse } from "next/server";
import Firecrawl from "@mendable/firecrawl-js";

export const runtime = "nodejs";

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

async function analyze(url: string) {
  const docs = (await firecrawl.crawlUrl(url, {
    limit: 15,
    scrapeOptions: {
      onlyMainContent: true,
      formats: ["markdown"],
    },
  })) as { data?: Array<{ markdown?: string }> };

  const content = docs?.data?.map((d) => d.markdown || "").join("\n") || "";

  const payload = {
    success: true,
    source: { url, fetchedAt: new Date().toISOString() },
    contentType: "markdown" as const,
    content,
    messages: [
      {
        role: "system" as const,
        content:
          "You are a website analysis agent. Use the user's provided webpage content to answer questions.",
      },
      { role: "user" as const, content },
    ],
  };

  return payload;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = searchParams.get("url");
    if (!rawUrl) {
      return NextResponse.json(
        { success: false, error: "Missing 'url' query parameter" },
        { status: 400 }
      );
    }
    const formattedUrl = quickFormatUrl(rawUrl.trim());
    const data = await analyze(formattedUrl);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("/api/websiteAnalysis GET error:", error);
    return NextResponse.json(
      { success: false, error: String((error as Error)?.message || error || "Unknown error") },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      url?: string;
    };
    if (!body?.url || typeof body.url !== "string") {
      return NextResponse.json(
        { success: false, error: "Body must include a string 'url'" },
        { status: 400 }
      );
    }
    const formattedUrl = quickFormatUrl(body.url.trim());
    const data = await analyze(formattedUrl);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("/api/websiteAnalysis POST error:", error);
    return NextResponse.json(
      { success: false, error: String((error as Error)?.message || error || "Unknown error") },
      { status: 500 }
    );
  }
}


