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
  "Database": Database,
  "Analytics": BarChart3,
  "User Management": Users,
  "File Processing": FileText,
  "Web Search": Globe,
  "Search": Search,
  "AI Processing": Brain,
  "Targeting": Target,
  "Trends": TrendingUp,
  "Messaging": MessageSquare,
  "Insights": Lightbulb,
  "Security": Shield,
  "Computing": Cpu,
  "Monitoring": Activity,
};

export function AgentInfoModal({ isOpen, onClose, currentAgent, availableAgents }: AgentInfoModalProps) {
  const currentAgentInfo = availableAgents.find(agent => agent.id === currentAgent);

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Current Agent Info - Left Side */}
          {currentAgentInfo && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
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
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentAgentInfo.capabilities.map((capability) => (
                        <Badge key={capability} variant="secondary" className="text-sm px-3 py-1">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools */}
                {currentAgentInfo.tools && currentAgentInfo.tools.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">Available Tools</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {currentAgentInfo.tools.map((tool) => {
                        const IconComponent = toolIcons[tool] || Brain;
                        return (
                          <div key={tool} className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium">{tool}</span>
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
                      <h6 className="text-sm font-medium mb-2 text-muted-foreground">Capabilities</h6>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.slice(0, 6).map((capability) => (
                          <Badge key={capability} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                        {agent.capabilities.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{agent.capabilities.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Agent Tools */}
                  {agent.tools && agent.tools.length > 0 && (
                    <div>
                      <h6 className="text-sm font-medium mb-2 text-muted-foreground">Tools</h6>
                      <div className="flex flex-wrap gap-2">
                        {agent.tools.slice(0, 8).map((tool) => {
                          const IconComponent = toolIcons[tool] || Brain;
                          return (
                            <div key={tool} className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/50">
                              <IconComponent className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{tool}</span>
                            </div>
                          );
                        })}
                        {agent.tools.length > 8 && (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/50">
                            <span className="text-xs text-muted-foreground">
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
