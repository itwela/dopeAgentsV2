"use client"

import { Brain, Check, Copy } from "lucide-react";
import { ChatAgent, ChatMessage } from "../../interfaces/agentChatInterfaces";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { KnowledgeBaseDropdown } from "../knowledge-base-dropdown";

interface MessageActionsProps {
  message: ChatMessage;
  messageIndex: number;
  availableAgents: ChatAgent[];
  copiedMessageIndex: number | null;
  showKnowledgeModal: boolean;
  setShowKnowledgeModal: (show: boolean) => void;
  selectedMessageContent: string;
  setSelectedMessageContent: (content: string) => void;
  onCopyMessage: (content: any, messageIndex: number) => void;
}

export function MessageActions({
  message,
  messageIndex,
  availableAgents,
  copiedMessageIndex,
  showKnowledgeModal,
  setShowKnowledgeModal,
  selectedMessageContent,
  setSelectedMessageContent,
  onCopyMessage,
}: MessageActionsProps) {
  if (message.role !== 'assistant') {
    return null;
  }

  const agentInfo = availableAgents.find(agent => agent.name === message.agentName);
  const isCopied = copiedMessageIndex === messageIndex;

  const handleCopyClick = () => {
    onCopyMessage(message.content, messageIndex);
  };

  const handleKnowledgeClick = () => {
    setSelectedMessageContent(message.content);
    setShowKnowledgeModal(true);
  };

  return (
    <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50 max-w-[80%]">
      <div className="flex flex-wrap gap-1">
        {agentInfo?.capabilities.map((capability) => (
          <Badge key={capability} variant="outline" className="text-xs px-2 py-0.5 text-muted-foreground">
            {capability}
          </Badge>
        ))}
      </div>

      <div className="flex gap-1 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleKnowledgeClick}
          className="h-8 px-2 cursor-pointer text-muted-foreground hover:text-foreground"
          title="Add to Knowledge Base"
        >
          <Brain className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyClick}
          className="h-8 px-2 cursor-pointer text-muted-foreground hover:text-foreground"
        >
          {isCopied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
        <KnowledgeBaseDropdown
          isOpen={showKnowledgeModal}
          onClose={() => setShowKnowledgeModal(false)}
          messageContent={selectedMessageContent}
        />
      </div>
    </div>
  );
}

