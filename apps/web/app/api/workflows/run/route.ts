import { NextRequest, NextResponse } from "next/server";
import { runInDepthAnalysisWorkflow } from "../../../../agentWorkflows/actions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userName, clientName, formData } = body;

    if (!userId || !userName || !clientName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate workflow ID upfront
    const workflowRunId = `workflow_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

    // Start the workflow in the background (don't await)
    runInDepthAnalysisWorkflow(
      userId,
      userName,
      clientName,
      null, // threadId
      formData,
      workflowRunId // Pass the workflowRunId
    ).catch((error) => {
      console.error("Background workflow error:", error);
    });

    // Return immediately with the workflow run ID
    return NextResponse.json({
      success: true,
      workflowRunId,
      message: "Workflow started"
    });
  } catch (error: any) {
    console.error("Workflow API error:", error);
    return NextResponse.json(
      { error: error.message || "Workflow execution failed" },
      { status: 500 }
    );
  }
}

