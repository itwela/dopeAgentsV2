"use client"

import { useState, useEffect } from "react";
import { ChatMessage, ChatAgent } from "../../interfaces/agentChatInterfaces";
import AITextLoading from "../ui/ai-text-loading";
import { GameBox } from "../gamebox";
import { MessageBubble } from "./message-bubble";
import { ToolResultMessage } from "./tool-result-message";
import { Button } from "../ui/button";

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
  const [showGame, setShowGame] = useState(false);
  const [gameDismissed, setGameDismissed] = useState(false);

  // Reset game state when loading stops
  useEffect(() => {
    if (!isLoading) {
      setShowGame(false);
      setGameDismissed(false);
    }
  }, [isLoading]);
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

      {isLoading && thinkingDuration >= 10 && !showGame && !gameDismissed && (
        <div className="mt-3 w-[67%] flex place-self-start items-start justify-start">
          <div className="bg-muted/50 border border-border rounded-lg p-4 w-full">
            <p className="text-sm text-muted-foreground mb-3">
              Would you like to play a game while you wait?
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => setShowGame(true)}
                className="text-xs"
              >
                Yes, let's play!
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setGameDismissed(true)}
                className="text-xs"
              >
                No thanks
              </Button>
            </div>
          </div>
        </div>
      )}

      {isLoading && thinkingDuration >= 10 && showGame && (
        <div className="mt-3 w-[67%] flex place-self-start items-start justify-start">
          <GameBox className="w-full" />
        </div>
      )}

      <div ref={messagesEndRef} />

      <div className="h-[200px]"></div>
    </div>
  );
}

