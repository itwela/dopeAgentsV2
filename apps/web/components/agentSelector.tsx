import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChatAgent } from "../interfaces/agentChatInterfaces";

interface AgentSelectorProps {
  currentAgent: string;
  availableAgents: ChatAgent[];
  onAgentChange: (agentId: string) => void;
  onInfoClick: () => void;
  elementVariants?: any;
}

export function AgentSelector({ 
  currentAgent, 
  availableAgents, 
  onAgentChange, 
  onInfoClick,
  elementVariants 
}: AgentSelectorProps) {
  return (
    <motion.div className="mb-6 flex items-center gap-3" variants={elementVariants}>
      <Select value={currentAgent} onValueChange={onAgentChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select agent" />
        </SelectTrigger>
        <SelectContent>
          {availableAgents.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              {agent.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Info Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onInfoClick}
        title="Agent Information & Tools"
        className="h-9 w-9 p-0"
      >
        <Info className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

