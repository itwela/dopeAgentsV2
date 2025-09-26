import { NextRequest, NextResponse } from 'next/server';

interface AgentInfo {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  model: string;
}

import { setTracingExportApiKey } from '@openai/agents';
import { setDefaultOpenAIKey } from '@openai/agents';
setDefaultOpenAIKey(process.env.NODE_ENV === 'production' ? process.env.OPENAI_API_KEY! : process.env.NEXT_PUBLIC_OPENAI_API_KEY!);
setTracingExportApiKey(process.env.NODE_ENV === 'production' ? process.env.OPENAI_API_KEY! : process.env.NEXT_PUBLIC_OPENAI_API_KEY!);

// DOPE agents - same as in chat route
const dopeAgents: AgentInfo[] = [
  {
    id: "hermes",
    name: "Hermes",
    description: "Proposal Generator - Utilizes templates and company information to generate tailored proposals",
    capabilities: ["proposal-generation", "client-analysis", "sales-support"],
    model: "gpt-4",
  },
  {
    id: "steve",
    name: "Steve",
    description: "Leadership Agent - Leverages CliftonStrengths and employee profiles for team development",
    capabilities: ["team-collaboration", "standup-facilitation", "performance-improvement"],
    model: "gpt-4",
  },
  {
    id: "atlas",
    name: "Atlas",
    description: "Business Intelligence Agent - Conducts website analysis for competitive intelligence",
    capabilities: ["website-analysis", "competitive-intelligence", "strategic-recommendations"],
    model: "gpt-4",
  },
  {
    id: "juno",
    name: "Juno",
    description: "Data Integration Agent - Connects to Metabase for comprehensive data analytics",
    capabilities: ["data-analytics", "metabase-integration", "decision-support"],
    model: "gpt-4",
  },
];

export async function GET() {
  try {
    // In a real app, you would fetch from a database
    return NextResponse.json({
      success: true,
      data: dopeAgents,
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const newAgent: AgentInfo = {
      id: Date.now().toString(), // In a real app, use a proper ID generator
      name: body.name,
      description: body.description,
      capabilities: body.capabilities || [],
      model: body.model || 'gpt-4',
    };

    // In a real app, you would save to a database
    dopeAgents.push(newAgent);

    return NextResponse.json({
      success: true,
      data: newAgent,
    });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}
