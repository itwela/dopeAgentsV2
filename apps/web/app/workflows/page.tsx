"use client";

import { useState, useEffect, useRef } from "react";
import { MainLayout } from "../../components/main-layout";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { BentoGrid, BentoCard } from "../../src/components/ui/bento-grid";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../../components/ui/dropdown-menu";
import { Plus, Play, MessageSquare, Loader2, Trash2, Copy, Check, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useUserData } from "../../components/providers/userDataProvider";
import { WorkflowFormModal, WorkflowFormData } from "../../components/workflow-form-modal";
import { Timeline } from "../../components/ui/timeline";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

// Predefined workflow templates
const WORKFLOW_TEMPLATES = [
  { id: "in-depth-analysis", name: "In Depth Analysis Workflow", description: "Comprehensive business analysis with customer type selection" },
];

// Mock clients for empty state - will be replaced with real data
const EMPTY_CLIENT_SLOTS = Array.from({ length: 8 }, (_, i) => ({
  id: `empty-${i + 1}`,
  name: "______",
  initials: "",
  isEmpty: true,
}));

export default function WorkflowsPage() {
  const router = useRouter();
  const { userId, userName, isLoading: userLoading } = useUserData();
  const [showWorkflowDropdown, setShowWorkflowDropdown] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);
  const [selectedWorkflowTemplate, setSelectedWorkflowTemplate] = useState<string>("");
  const [activeWorkflowRunId, setActiveWorkflowRunId] = useState<string | null>(null);
  const [expandedWorkflowId, setExpandedWorkflowId] = useState<string | null>(null);
  const [isWorkflowResultsExpanded, setIsWorkflowResultsExpanded] = useState(false);
  const [copiedWorkflowId, setCopiedWorkflowId] = useState<string | null>(null);
  const [editingWorkflowId, setEditingWorkflowId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Mutations
  const createWorkflowRun = useMutation(api.threads.createWorkflowRun);
  const saveWorkflowResult = useMutation(api.threads.saveWorkflowResult);
  const updateWorkflowStatus = useMutation(api.threads.updateWorkflowRunStatus);
  const createThreadFromWorkflow = useMutation(api.threads.createThreadFromWorkflow);
  const createClient = useMutation(api.clients.createClient);
  const deleteWorkflowRun = useMutation(api.threads.deleteWorkflowRun);
  const updateWorkflowRun = useMutation(api.threads.updateWorkflowRun);
  
  // Queries
  const workflowRuns = useQuery(
    api.threads.getUserWorkflowRuns,
    userName ? { userName } : "skip"
  ) || [];
  
  // Get active workflow results for live updates
  const activeWorkflowResults = useQuery(
    api.threads.getWorkflowResults,
    activeWorkflowRunId ? { workflowRunId: activeWorkflowRunId } : "skip"
  );
  
  // Get active workflow run status
  const activeWorkflowRun = useQuery(
    api.threads.getWorkflowRun,
    activeWorkflowRunId ? { workflowRunId: activeWorkflowRunId } : "skip"
  );
  
  const clients = useQuery(api.clients.getUserClients, { userName });
  
  // Get workflow counts for all clients
  const clientWorkflowCounts = useQuery(
    api.threads.getClientWorkflowCounts,
    userName ? { userName } : "skip"
  );
  
  // Get workflows for selected client
  const selectedClientName = clients?.find((c: any) => c.clientId === selectedClient)?.name;
  const clientWorkflows = useQuery(
    api.threads.getClientWorkflowRuns,
    selectedClientName ? { clientName: selectedClientName } : "skip"
  );
  
  // Get results for expanded workflow
  const expandedWorkflowResults = useQuery(
    api.threads.getWorkflowResults,
    expandedWorkflowId ? { workflowRunId: expandedWorkflowId } : "skip"
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowWorkflowDropdown(false);
      }
    };

    if (showWorkflowDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWorkflowDropdown]);

  // Auto-close workflow results after completion or error
  useEffect(() => {
    if (activeWorkflowRun?.status === "completed" || activeWorkflowRun?.status?.includes("error")) {
      const timer = setTimeout(() => {
        setActiveWorkflowRunId(null);
        setIsWorkflowResultsExpanded(false);
      }, 30000); // Close after 30 seconds

      return () => clearTimeout(timer);
    }
  }, [activeWorkflowRun?.status]);

  const handleWorkflowSelect = (workflowId: string) => {
    setShowWorkflowDropdown(false);
    
    // Show workflow form modal for "In Depth Analysis Workflow"
    setSelectedWorkflowTemplate(workflowId);
    setShowWorkflowForm(true);
  };

  const handleWorkflowFormSubmit = async (formData: WorkflowFormData) => {
    try {
      setShowWorkflowForm(false);

      // Create or get the client
      const existingClient = clients?.find((c: any) => c.name === formData.clientName);
      if (!existingClient) {
        await createClient({
          userId: userId || "",
          userName: userName || "",
          name: formData.clientName,
        });
      }

      // Call the API route to run the workflow on the server
      const response = await fetch("/api/workflows/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId || "",
          userName: userName || "",
          clientName: formData.clientName,
          formData: {
            customerType: formData.customerType || undefined,
            notes: formData.notes,
            websiteUrl: formData.websiteUrl,
            industry: formData.industry,
            primaryLocation: formData.primaryLocation,
            radius: formData.radius,
            lastOrderDate: formData.lastOrderDate,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Workflow API request failed");
      }

      const result = await response.json();

      if (result.success) {
        // Set the active workflow run ID to show live results
        setActiveWorkflowRunId(result.workflowRunId);
        setIsWorkflowResultsExpanded(false); // Start collapsed
        
        // Auto-close after workflow completes (will be handled by useEffect watching status)
      } else {
        throw new Error(result.error || "Workflow failed");
      }
      
    } catch (error) {
      console.error("Workflow error:", error);
      alert("Failed to run workflow: " + error);
      setActiveWorkflowRunId(null);
    } finally {
      setSelectedWorkflowTemplate("");
    }
  };


  const handleChatWithResults = async (workflowRunId: string) => {
    try {
      const result = await createThreadFromWorkflow({
        workflowRunId,
        userId,
        userName,
      });
      
      // Navigate to agents page with the thread
      router.push(`/agents?threadId=${result.threadId}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
      alert("Failed to create chat: " + error);
    }
  };

  const handleDeleteWorkflow = async (workflowRunId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent expanding the workflow
    
    if (!confirm("Are you sure you want to delete this workflow and all its results?")) {
      return;
    }
    
    try {
      await deleteWorkflowRun({ workflowRunId });
      
      // Close expanded view if this workflow was expanded
      if (expandedWorkflowId === workflowRunId) {
        setExpandedWorkflowId(null);
      }
    } catch (error) {
      console.error("Failed to delete workflow:", error);
      alert("Failed to delete workflow: " + error);
    }
  };

  const handleCopyWorkflowId = (workflowRunId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent expanding the workflow
    
    navigator.clipboard.writeText(workflowRunId);
    setCopiedWorkflowId(workflowRunId);
    
    // Reset the checkmark after 2 seconds
    setTimeout(() => {
      setCopiedWorkflowId(null);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (status?.includes('error')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    if (status?.includes('running')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  // Show loading state while user data is being fetched
  if (userLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading workflows...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-6 space-y-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Client Workflows</h1>
            <p className="text-muted-foreground">
              Start and run automated agent workflows
            </p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <Button 
              onClick={() => setShowWorkflowDropdown(!showWorkflowDropdown)} 
              disabled={activeWorkflowRun?.status === "running" || activeWorkflowRun?.status?.includes("running")}
            >
              <Play className="mr-2 h-4 w-4" />
              Start Workflow
            </Button>
            
            {/* Workflow Dropdown */}
            {showWorkflowDropdown && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                <div className="space-y-1">
                  {WORKFLOW_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleWorkflowSelect(template.id)}
                      className="flex w-full flex-col items-start rounded-sm px-3 py-3 text-left hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{template.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Workflow Progress - Shows automatically when workflow is running */}
        {activeWorkflowRunId && (
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {activeWorkflowRun?.status === "completed" ? (
                    <>
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">Workflow Complete</span>
                    </>
                  ) : activeWorkflowRun?.status?.includes("error") ? (
                    <>
                      <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-red-700 dark:text-red-400 capitalize">{activeWorkflowRun.status}</span>
                    </>
                  ) : (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {activeWorkflowRun?.status || "Running workflow..."}
                      </span>
                    </>
                  )}
                </div>
                
                {/* Progress indicator */}
                {activeWorkflowResults && activeWorkflowResults.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activeWorkflowResults.length} step{activeWorkflowResults.length !== 1 ? 's' : ''} completed</span>
                    {activeWorkflowRun?.status !== "completed" && activeWorkflowRun?.status?.includes("error") === false && (
                      <span>•</span>
                    )}
                    {activeWorkflowRun?.status !== "completed" && activeWorkflowRun?.status?.includes("error") === false && (
                      <span>In progress...</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {activeWorkflowResults && activeWorkflowResults.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWorkflowResultsExpanded(!isWorkflowResultsExpanded)}
                    className="text-xs h-7 px-2 hover:text-primary"
                  >
                    {isWorkflowResultsExpanded ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        View Details
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveWorkflowRunId(null);
                    setIsWorkflowResultsExpanded(false);
                  }}
                  className="text-xs h-7 px-2 hover:text-primary"
                >
                  Dismiss
                </Button>
              </div>
            </div>
            
            {/* Expanded Results */}
            {isWorkflowResultsExpanded && activeWorkflowResults && activeWorkflowResults.length > 0 && (
              <div className="mt-4 pt-4 border-t border-primary/10">
                <Timeline
                  data={activeWorkflowResults.map((result: any, index: number) => ({
                    title: result.stepTitle,
                    stepNumber: result.stepNumber,
                    agentName: result.agentName,
                    status: activeWorkflowRun?.status === "completed" ? "completed" : 
                            activeWorkflowRun?.status?.includes("error") ? "error" : 
                            index === activeWorkflowResults.length - 1 ? "running" : "completed",
                    content: (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {result.response}
                        </ReactMarkdown>
                      </div>
                    ),
                  }))}
                />
              </div>
            )}
            
            {/* Initializing state */}
            {(!activeWorkflowResults || activeWorkflowResults.length === 0) && (
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground">Initializing workflow...</p>
              </div>
            )}
          </div>
        )}

        {/* Clients Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
              }
            }
          }}
        >
          {(() => {
            // Combine real clients with empty slots to always show 8 cards
            const realClients = clients || [];
            const displayClients: any[] = [...realClients];
            
            // Fill remaining slots with empty placeholders
            while (displayClients.length < 8) {
              displayClients.push({
                _id: `empty-${displayClients.length + 1}`,
                clientId: `empty-${displayClients.length + 1}`,
                name: "______",
                initials: "",
                isEmpty: true,
              });
            }
            
            return displayClients.slice(0, 8).map((client: any) => {
              const isSelected = selectedClient === client.clientId;
              const workflowCount = clientWorkflowCounts?.[client.name] || 0;
              
              return (
                <motion.div
                  key={client.clientId || client._id}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }
                    }
                  }}
                  className={`bg-background border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    if (!client.isEmpty) {
                      setSelectedClient(selectedClient === client.clientId ? null : client.clientId);
                    }
                  }}
                >
                  <div className="flex flex-col gap-3 text-center">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto">
                      <span className={`text-sm font-semibold text-muted-foreground ${client.isEmpty ? 'opacity-50' : 'opacity-100'}`}>
                        {client.isEmpty ? "" : (client.initials || client.name?.substring(0, 2).toUpperCase() || "")}
                      </span>
                    </div>
                    <h3 className={`font-semibold text-foreground ${client.isEmpty ? 'opacity-20' : 'opacity-100'}`}>
                      {client.isEmpty ? "______" : client.name}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${client.isEmpty ? 'opacity-50' : 'opacity-100'}`}>
                      {client.isEmpty 
                        ? "Start a workflow.." 
                        : workflowCount === 0 
                          ? "No workflows yet" 
                          : `${workflowCount} workflow${workflowCount !== 1 ? 's' : ''}`
                      }
                    </p>
                  </div>
                </motion.div>
              );
            });
          })()}
        </motion.div>


        {/* Client Workflows - Only show when client is selected */}
        {selectedClient && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {clients?.find((c: any) => c.clientId === selectedClient)?.name || "Client"} Workflows
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedClient(null)}
                className="hover:text-primary"
              >
                Back to All Clients
              </Button>
            </div>
            
            {clientWorkflows && clientWorkflows.length > 0 ? (
              <div className="space-y-3">
                {clientWorkflows.map((workflow: any) => {
                  const isExpanded = expandedWorkflowId === workflow.workflowRunId;
                  const workflowResults = isExpanded ? expandedWorkflowResults : null;
                  
                  return (
                    <Card key={workflow._id} className="overflow-hidden">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedWorkflowId(isExpanded ? null : workflow.workflowRunId)}>
                          <div className="flex-1">
                            {editingWorkflowId === workflow.workflowRunId ? (
                              <div className="flex items-center gap-2 mb-1" onClick={(e) => e.stopPropagation()}>
                                <Input
                                  value={editingTitle}
                                  onChange={(e) => setEditingTitle(e.target.value)}
                                  className="h-8 text-sm"
                                  placeholder="Edit title"
                                />
                                <Button
                                  size="sm"
                                  className="h-8 px-2"
                                  disabled={isSavingTitle || !editingTitle.trim()}
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    if (!editingTitle.trim()) return;
                                    try {
                                      setIsSavingTitle(true);
                                      await updateWorkflowRun({ workflowRunId: workflow.workflowRunId, title: editingTitle.trim() });
                                      setEditingWorkflowId(null);
                                    } catch (err) {
                                      console.error('Failed to update title', err);
                                      alert('Failed to update title');
                                    } finally {
                                      setIsSavingTitle(false);
                                    }
                                  }}
                                  title="Save"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 hover:text-primary"
                                  onClick={(e) => { e.stopPropagation(); setEditingWorkflowId(null); setEditingTitle(""); }}
                                  title="Cancel"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 mb-1" onClick={(e) => e.stopPropagation()}>
                                <h3 className="font-semibold text-sm">{workflow.title}</h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 hover:text-primary"
                                  onClick={() => { setEditingWorkflowId(workflow.workflowRunId); setEditingTitle(workflow.title || ""); }}
                                  title="Edit title"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            )}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{new Date(workflow.createdAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <Badge className={getStatusColor(workflow.status)} variant="outline">
                                {workflow.status}
                              </Badge>
                            </div>
                            {/* Workflow ID with copy button */}
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <span className="font-mono">ID: {workflow.workflowRunId.slice(0, 8)}...</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleCopyWorkflowId(workflow.workflowRunId, e)}
                                className="h-5 w-5 p-0 hover:bg-accent"
                                title="Copy workflow ID"
                              >
                                {copiedWorkflowId === workflow.workflowRunId ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleDeleteWorkflow(workflow.workflowRunId, e)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:text-primary"
                            >
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        
                        {isExpanded && workflowResults && workflowResults.length > 0 && (
                          <div className="mt-6">
                            <Timeline
                              data={workflowResults.map((result: any) => ({
                                title: result.stepTitle,
                                stepNumber: result.stepNumber,
                                agentName: result.agentName,
                                status: "completed",
                                content: (
                                  <div className="prose prose-lg max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {result.response}
                                    </ReactMarkdown>
                                  </div>
                                ),
                              }))}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <div className="space-y-2">
                    <p>No workflows for this client yet.</p>
                    <p className="text-sm">Start a workflow to populate this section.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Workflow Form Modal */}
        <WorkflowFormModal
          isOpen={showWorkflowForm}
          onClose={() => {
            setShowWorkflowForm(false);
            setSelectedWorkflowTemplate("");
          }}
          onSubmit={handleWorkflowFormSubmit}
          workflowTitle={WORKFLOW_TEMPLATES.find(w => w.id === selectedWorkflowTemplate)?.name || "Workflow"}
        />
      </div>
    </MainLayout>
  );
}
