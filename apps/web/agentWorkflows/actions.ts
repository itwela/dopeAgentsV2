import { ConvexHttpClient } from "convex/browser";
import { AgentInputItem, Runner, user } from "@openai/agents";
import { api } from "../convex/_generated/api";
import { businessDataExtractionAgentCore, emailCreationAgentCore, zipCodeAnalysisAgentCore, titleGeneratorAgent } from "./agents";
import { WorkflowResult } from "./utils";
import { getOrCreateThread } from "./utils";

export async function runInDepthAnalysisWorkflow(
  userId: string,
  userName: string,
  clientName: string,
  threadId: string | null,
  formData?: {
    customerType?: string;
    notes?: string;
    websiteUrl?: string;
    industry?: string;
    primaryLocation?: string;
    radius?: string;
    lastOrderDate?: string;
  },
  workflowRunId?: string
): Promise<WorkflowResult> {
  // Use provided workflow run ID or generate new one
  const finalWorkflowRunId = workflowRunId || `workflow_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  try {
    
    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Note: Client creation is handled in the frontend before workflow starts
    // No need to create client here

    // Get or create thread
    const { conversationThread, currentThreadId } = await getOrCreateThread(convex, threadId);

    const runner = new Runner({
      traceMetadata: {
        __trace_source__: 'analysis-workflow',
        workflow_id: finalWorkflowRunId,
      },
    });

    const history: any[] = [...conversationThread];
    const stepSections: string[] = [];
    const stepResults: WorkflowResult['stepResults'] = [];

    console.log(`🚀 Starting Analysis Workflow for ${clientName}: ${finalWorkflowRunId}`);

    // Create workflow run record immediately so it appears in UI
    await convex.mutation(api.threads.createWorkflowRun, {
      workflowRunId: finalWorkflowRunId,
      userId,
      userName,
      title: `Analysis Workflow - ${clientName}`,
      clientName,
      threadId: currentThreadId || undefined,
      status: "running"
    });

    let formContextMessage: any = null;

    // Add form data context to the conversation
    if (formData) {
      formContextMessage = user(`Workflow Form Data:
      - Client: ${clientName}
      - Customer Type: ${formData.customerType || 'Not specified'}
      - Notes: ${formData.notes || 'None'}
      - Website URL: ${formData.websiteUrl || 'Not provided'}
      - Industry: ${formData.industry || 'Not specified'}
      - Primary Location: ${formData.primaryLocation || 'Not specified'}
      - Radius: ${formData.radius || '5'} miles
      - Last Order Date: ${formData.lastOrderDate || 'Not specified'}

      Please use this context throughout the analysis workflow. Focus on the customer type (${formData.customerType || 'Not specified'}) when making recommendations and analysis. Use the industry (${formData.industry || 'Not specified'}) and location (${formData.primaryLocation || 'Not specified'}) data for targeted analysis.`);
      history.push(formContextMessage);
    }

    // Step 1: Context Builder
    console.log("📋 Step 1: Business Data Extraction...");
    // const contextMessage = user(`Please analyze the current conversation and retrieve account information, CRM ID, CRM connections, and recent jobs from the database for client: ${clientName}`);
    const historyWithContext = [...history, formContextMessage || ''];
    let step1Text = ''
    let step2Text = ''
    let step3Text = ''

    // NOTE Step 1: Business Data Extraction
    try {
      const userMessage = user(`Extract business data for: ${clientName}`);
      const step1 = await runner.run(businessDataExtractionAgentCore, [...historyWithContext, userMessage]);
      if (!step1.finalOutput) {
        throw new Error('Business data extraction failed to produce output');
      }

      history.push(...(step1.newItems || []).map((i: any) => i.rawItem));
      step1Text = typeof step1.finalOutput === 'string' ? step1.finalOutput : JSON.stringify(step1.finalOutput);

      stepSections.push([
        `# 🗂️ Step 1: Business Data Extraction Results - ${clientName}`,
        `**Client:** ${clientName}`,
        `**Generated:** ${new Date().toISOString()}`,
        '',
        step1Text,
      ].join('\n'));

      // Save step 1 result
      const step1Result = {
        stepNumber: 1,
        agentName: "Business Data Extraction",
        stepTitle: `Business Data Extraction - Account & CRM Analysis (${clientName})`,
        response: step1Text,
        timestamp: Date.now()
      };
      stepResults.push(step1Result);

      await convex.mutation(api.threads.saveWorkflowResult, {
        workflowRunId: finalWorkflowRunId,
        userId,
        userName,
        stepNumber: 1,
        agentName: "Business Data Extraction",
        stepTitle: `Business Data Extraction - Account & CRM Analysis (${clientName})`,
        response: step1Text,
        threadId: currentThreadId || undefined,
        metadata: { timestamp: new Date().toISOString(), clientName }
      });

      // Update workflow run status
      await convex.mutation(api.threads.updateWorkflowRun, {
        workflowRunId: finalWorkflowRunId,
        status: "running, onto step 2",
        metadata: { currentStep: 1, totalSteps: 3, clientName }
      });

      console.log("✅ Step 1 completed");
    } catch (error: any) {
      console.error("❌ Step 1 failed:", error);
      await convex.mutation(api.threads.updateWorkflowRun, {
        workflowRunId: finalWorkflowRunId,
        status: "error with step 1",
        metadata: { currentStep: 1, totalSteps: 3, clientName, error: error.message }
      });
      throw new Error(`Step 1 (Business Data Extraction) failed: ${error.message}`);
    }

    // Step 2: Job Analyzer
    console.log("📊 Step 2: Zip Code Analysis Analyzer...");
    try {
      const userMessage = user(`Analyze the business data for: ${clientName}. Your target radius is ${formData?.radius || '5'} miles.`);
      const step2 = await runner.run(zipCodeAnalysisAgentCore, [...historyWithContext, userMessage]);
      if (!step2.finalOutput) {
        throw new Error('Zip code analysis analyzer failed to produce output');
      }

      history.push(...(step2.newItems || []).map((i: any) => i.rawItem));
      step2Text = typeof step2.finalOutput === 'string' ? step2.finalOutput : JSON.stringify(step2.finalOutput);

      stepSections.push([
        `# 📝 Step 2: Zip Code Analysis Analyzer Results - ${clientName}`,
        `**Client:** ${clientName}`,
        `**Generated:** ${new Date().toISOString()}`,
        '',
        step2Text,
      ].join('\n'));

      // Save step 2 result
      const step2Result = {
        stepNumber: 2,
        agentName: "Zip Code Analysis Analyzer",
        stepTitle: `Zip Code Analysis Analyzer - Pattern Analysis (${clientName})`,
        response: step2Text,
        timestamp: Date.now()
      };
      stepResults.push(step2Result);

      await convex.mutation(api.threads.saveWorkflowResult, {
        workflowRunId: finalWorkflowRunId,
        userId,
        userName,
        stepNumber: 2,
        agentName: "Zip Code Analysis Analyzer",
        stepTitle: `Zip Code Analysis Analyzer - Pattern Analysis (${clientName})`,
        response: step2Text,
        threadId: currentThreadId || undefined,
        metadata: { timestamp: new Date().toISOString(), clientName }
      });

      // Update workflow run status
      await convex.mutation(api.threads.updateWorkflowRun, {
        workflowRunId: finalWorkflowRunId,
        status: "running, onto step 3",
        metadata: { currentStep: 2, totalSteps: 3, clientName }
      });

      console.log("✅ Step 2 completed");
    } catch (error: any) {
      console.error("❌ Step 2 failed:", error);
      await convex.mutation(api.threads.updateWorkflowRun, {
        workflowRunId: finalWorkflowRunId,
        status: "error with step 2",
        metadata: { currentStep: 2, totalSteps: 3, clientName, error: error.message }
      });
      throw new Error(`Step 2 (Zip Code Analysis) failed: ${error.message}`);
    }

    // Step 3: Targeting Strategy Builder
    console.log("🎯 Step 3: Email Creation...");
    try {

      const steps1and2Text: AgentInputItem[] = [user(step1Text), user(step2Text)];
      const userMessage = user(`Create a campaign strategy for: ${clientName}. Based on the business data and zip code analysis.`);
      const fullMessage = [...steps1and2Text, userMessage];
      const step3 = await runner.run(emailCreationAgentCore, fullMessage);
      if (!step3.finalOutput) {
        throw new Error('Email creation failed to produce output');
      }

      history.push(...(step3.newItems || []).map((i: any) => i.rawItem));
      const step3Text = typeof step3.finalOutput === 'string' ? step3.finalOutput : JSON.stringify(step3.finalOutput);

      stepSections.push([
        `# 🎯 Step 3: Email Creation Results - ${clientName}`,
        `**Client:** ${clientName}`,
        `**Generated:** ${new Date().toISOString()}`,
        '',
        step3Text,
      ].join('\n'));

      // Save step 3 result
      const step3Result = {
        stepNumber: 3,
        agentName: "Email Creation",
        stepTitle: `Email Creation - Campaign Strategy (${clientName})`,
        response: step3Text,
        timestamp: Date.now()
      };
      stepResults.push(step3Result);

      await convex.mutation(api.threads.saveWorkflowResult, {
        workflowRunId: finalWorkflowRunId,
        userId,
        userName,
        stepNumber: 3,
        agentName: "Email Creation",
        stepTitle: `Email Creation - Campaign Strategy (${clientName})`,
        response: step3Text,
        threadId: currentThreadId || undefined,
        metadata: { timestamp: new Date().toISOString(), clientName }
      });

      // Update workflow run status
      await convex.mutation(api.threads.updateWorkflowRun, {
        workflowRunId: finalWorkflowRunId,
        status: "running, finalizing",
        metadata: { currentStep: 3, totalSteps: 3, clientName }
      });

      console.log("✅ Step 3 completed");
    } catch (error: any) {
      console.error("❌ Step 3 failed:", error);
      await convex.mutation(api.threads.updateWorkflowRun, {
        workflowRunId: finalWorkflowRunId,
        status: "error with step 3",
        metadata: { currentStep: 3, totalSteps: 3, clientName, error: error.message }
      });
      throw new Error(`Step 3 (Email Creation) failed: ${error.message}`);
    }

    // Generate Title and Complete
    console.log("📝 Finalizing workflow...");
    let generatedTitle = `Analysis Workflow - ${clientName}`;
    
    try {
      const titleMessage = user(`Based on the workflow results for client "${clientName}", generate a concise, descriptive title for this workflow run. Include the client name and main purpose.`);
      const step5 = await runner.run(titleGeneratorAgent, [...history, titleMessage]);
      
      if (step5.finalOutput) {
        const titleText = typeof step5.finalOutput === 'string' ? step5.finalOutput : JSON.stringify(step5.finalOutput);
        generatedTitle = titleText.replace(/['"]/g, '').trim(); // Clean up quotes
      }
    } catch (error: any) {
      console.warn("⚠️ Title generation failed, using default title:", error);
      // Continue with default title
    }

    // Update workflow run with final title and completion status
    await convex.mutation(api.threads.updateWorkflowRun, {
      workflowRunId: finalWorkflowRunId,
      title: generatedTitle,
      status: "completed",
      completedAt: Date.now(),
      metadata: { currentStep: 3, totalSteps: 3, clientName, completed: true }
    });

    const finalOutput = stepSections.join('\n\n');
    console.log(`🎉 Workflow completed: ${finalWorkflowRunId} - ${generatedTitle}`);

    return {
      success: true,
      workflowRunId: finalWorkflowRunId,
      finalOutput,
      stepResults,
      title: generatedTitle
    };

  } catch (error: any) {
    console.error('Workflow failed:', error);
    
    // The error is already handled and status updated in the step-specific catch blocks
    // Just return the error result
    return {
      success: false,
      workflowRunId: finalWorkflowRunId || `failed_${Date.now()}`,
      finalOutput: '',
      stepResults: [],
      error: error.message
    };
  }
}

