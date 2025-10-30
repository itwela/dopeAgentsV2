"use client"

import { ChatMessage, ChatAgent } from "../../interfaces/agentChatInterfaces";
import AITextLoading from "../ui/ai-text-loading";
import { MessageBubble } from "./message-bubble";
import { ToolResultMessage } from "./tool-result-message";

interface MessagesListProps {
  messages: ChatMessage[];
  availableAgents: ChatAgent[];
  isLoading: boolean;
  currentAgent: string;
  thinkingDuration: number;
  copiedMessageIndex: number | null;
  expandedToolCalls: Set<number>;
  expandedToolResults: Set<number>;
  showKnowledgeModal: boolean;
  setShowKnowledgeModal: (show: boolean) => void;
  selectedMessageContent: string;
  setSelectedMessageContent: (content: string) => void;
  toggleToolCallsExpansion: (index: number) => void;
  toggleToolResultExpansion: (index: number) => void;
  onCopyMessage: (content: any, messageIndex: number) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MessagesList({
  messages,
  availableAgents,
  isLoading,
  currentAgent,
  thinkingDuration,
  copiedMessageIndex,
  expandedToolCalls,
  expandedToolResults,
  showKnowledgeModal,
  setShowKnowledgeModal,
  selectedMessageContent,
  setSelectedMessageContent,
  toggleToolCallsExpansion,
  toggleToolResultExpansion,
  onCopyMessage,
  messagesEndRef,
}: MessagesListProps) {
  return (
    <div className="space-y-4 w-full w-[80%] hide-scrollbar">
      {messages.map((message, index) => {
        // Handle tool result messages with collapsible UI
        if ((message as any).isToolResult) {
          return (
            <ToolResultMessage
              key={index}
              message={message}
              messageIndex={index}
              expandedToolResults={expandedToolResults}
              toggleToolResultExpansion={toggleToolResultExpansion}
            />
          );
        }

        return (
          <MessageBubble
            key={index}
            message={message}
            messageIndex={index}
            availableAgents={availableAgents}
            copiedMessageIndex={copiedMessageIndex}
            expandedToolCalls={expandedToolCalls}
            showKnowledgeModal={showKnowledgeModal}
            setShowKnowledgeModal={setShowKnowledgeModal}
            selectedMessageContent={selectedMessageContent}
            setSelectedMessageContent={setSelectedMessageContent}
            toggleToolCallsExpansion={toggleToolCallsExpansion}
            onCopyMessage={onCopyMessage}
          />
        );
      })}

      {isLoading && (
        <div className="flex justify-start items-center w-full">
          {thinkingDuration > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              ({thinkingDuration}s)
            </span>
          )}
          <AITextLoading
            texts={[
              `${currentAgent.charAt(0).toUpperCase() + currentAgent.slice(1)} is thinking...`,
              "Processing your request...",
              "Analyzing data...",
              "Running tools...",
            ]}
            className="text-sm font-medium text-muted-foreground"
            interval={3618}
          />
        </div>
      )}

      <div ref={messagesEndRef} />

      <div className="h-[200px]"></div>
    </div>
  );
}

