"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Info, Database, BarChart3, Users, FileText, Globe, Search, Brain, Target, TrendingUp, MessageSquare, Lightbulb, Shield, Cpu, Activity } from "lucide-react";

interface ChatAgent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  tools: string[];
}

interface AgentInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAgent: string;
  availableAgents: ChatAgent[];
}

const toolIcons: { [key: string]: any } = {
  "database": Database,
  "analytics": BarChart3,
  "user": Users,
  "file": FileText,
  "web": Globe,
  "search": Search,
  "brain": Brain,
  "target": Target,
  "trend": TrendingUp,
  "message": MessageSquare,
  "insight": Lightbulb,
  "security": Shield,
  "cpu": Cpu,
  "activity": Activity,
};

// Tool display names mapping for cleaner user interface
const TOOL_DISPLAY_NAMES: Record<string, string> = {
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
  
  // Web Tools
  'web_search': '🌐 Web Search'
};

// Format tool names to be more readable
function formatToolName(toolName: string): string {
  return TOOL_DISPLAY_NAMES[toolName] || toolName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get icon based on tool name keywords
function getToolIcon(toolName: string) {
  const lowerName = toolName.toLowerCase();
  
  if (lowerName.includes('search') || lowerName.includes('semantic')) return Search;
  if (lowerName.includes('web')) return Globe;
  if (lowerName.includes('email') || lowerName.includes('template')) return MessageSquare;
  if (lowerName.includes('knowledge') || lowerName.includes('pinecone')) return Database;
  if (lowerName.includes('employee') || lowerName.includes('transcript')) return Users;
  if (lowerName.includes('list') || lowerName.includes('faq')) return FileText;
  if (lowerName.includes('analysis') || lowerName.includes('zip')) return BarChart3;
  if (lowerName.includes('proposal') || lowerName.includes('generate')) return Lightbulb;
  
  return Brain;
}

export function AgentInfoModal({ isOpen, onClose, currentAgent, availableAgents }: AgentInfoModalProps) {
  const currentAgentInfo = availableAgents.find(agent => agent.id === currentAgent);

  // Debug: Log Steve's tools
  const steveAgent = availableAgents.find(agent => agent.id === 'steve');
  if (steveAgent && isOpen) {
    console.log('🔍 Steve Agent Tools:', steveAgent.tools);
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[60vw] !max-w-none !h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Info className="h-6 w-6" />
            Agent Information & Tools
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-8 h-full">
          {/* Current Agent Info - Left Side */}
          {currentAgentInfo && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-950/20 rounded-xl p-6 border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
                    <span className="text-2xl font-bold">
                      {currentAgentInfo.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{currentAgentInfo.name}</h3>
                    <p className="text-muted-foreground text-lg">
                      {currentAgentInfo.description}
                    </p>
                  </div>
                </div>

                {/* Capabilities */}
                {currentAgentInfo.capabilities && currentAgentInfo.capabilities.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentAgentInfo.capabilities.map((capability) => (
                        <Badge key={capability} variant="secondary" className="text-sm px-3 py-1.5 font-medium">
                          {formatToolName(capability)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools */}
                {currentAgentInfo.tools && currentAgentInfo.tools.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Available Tools</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {currentAgentInfo.tools.map((tool) => {
                        const IconComponent = getToolIcon(tool);
                        return (
                          <div key={tool} className="flex items-center gap-3 p-3 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-border/50 hover:border-primary/50 transition-colors">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{formatToolName(tool)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Available Agents - Right Side */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-foreground">All Available Agents</h4>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {availableAgents.map((agent) => (
                <div key={agent.id} className="border rounded-xl p-5 space-y-4 hover:shadow-md transition-shadow bg-card">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                      <span className="text-lg font-bold text-foreground">
                        {agent.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-lg text-foreground">{agent.name}</h5>
                      <p className="text-muted-foreground">
                        {agent.description}
                      </p>
                    </div>
                  </div>

                  {/* Agent Capabilities */}
                  {agent.capabilities && agent.capabilities.length > 0 && (
                    <div>
                      <h6 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Capabilities</h6>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.slice(0, 6).map((capability) => (
                          <Badge key={capability} variant="outline" className="text-xs px-2 py-0.5">
                            {formatToolName(capability)}
                          </Badge>
                        ))}
                        {agent.capabilities.length > 6 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{agent.capabilities.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Agent Tools */}
                  {agent.tools && agent.tools.length > 0 && (
                    <div>
                      <h6 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Tools ({agent.tools.length})</h6>
                      <div className="flex flex-wrap gap-2">
                        {agent.tools.slice(0, 8).map((tool) => {
                          const IconComponent = getToolIcon(tool);
                          return (
                            <div key={tool} className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-muted/50 border border-border/30 hover:bg-muted/70 transition-colors">
                              <div className="flex h-4 w-4 items-center justify-center">
                                <IconComponent className="h-3.5 w-3.5 text-muted-foreground" />
                              </div>
                              <span className="text-xs font-medium">{formatToolName(tool)}</span>
                            </div>
                          );
                        })}
                        {agent.tools.length > 8 && (
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-muted/30 border border-dashed border-border/50">
                            <span className="text-xs text-muted-foreground font-medium">
                              +{agent.tools.length - 8} more
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
