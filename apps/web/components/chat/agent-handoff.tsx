"use client"

import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

interface AgentHandoffProps {
  handoffs?: Array<{ from: string, to: string, timestamp: number }>;
}

export function AgentHandoff({ handoffs }: AgentHandoffProps) {
  if (!handoffs || handoffs.length === 0) return null;

  return (
    <div className="mt-3 border-t border-border/30 pt-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <ArrowRight className="h-3 w-3" />
        <span className="font-medium">Agent Handoffs</span>
      </div>
      <div className="space-y-2">
        {handoffs.map((handoff, index) => (
          <div key={index} className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
            <div className="flex items-center gap-1 text-xs">
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                {handoff.from}
              </Badge>
              <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <Badge variant="default" className="text-xs px-2 py-0.5">
                {handoff.to}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground ml-auto">
              {new Date(handoff.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

