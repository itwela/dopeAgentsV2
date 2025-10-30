"use client"

import { motion } from "framer-motion";
import { ChatAgent } from "../../interfaces/agentChatInterfaces";
import { AgentHeader } from "../agentHeader";
import { AgentSelector } from "../agentSelector";
import { ChatInput } from "../chat-input";

interface EmptyChatViewProps {
  currentAgent: string;
  currentAgentInfo?: ChatAgent;
  availableAgents: ChatAgent[];
  input: string;
  isLoading: boolean;
  isTranscribing: boolean;
  isRecording: boolean;
  canShowToolsDropdown: boolean;
  isToolsOpen: boolean;
  setIsToolsOpen: (value: boolean) => void;
  selectedTools: string[];
  availableWorkflows: Array<{ workflowRunId: string; title: string; clientName?: string }>;
  isWorkflowsOpen: boolean;
  setIsWorkflowsOpen: (value: boolean) => void;
  selectedWorkflowId: string | null;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  toolsContainerRef: React.RefObject<HTMLDivElement | null>;
  workflowsContainerRef: React.RefObject<HTMLDivElement | null>;
  onAgentChange: (agent: string) => void;
  onInfoClick: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onCancelRecording: () => void;
  onSelectTool: (tool: string) => void;
  onRemoveSelectedTool: (tool: string) => void;
  onSelectWorkflow: (workflowId: string | null) => void;
  getToolDisplayName: (tool: string) => string;
  className?: string;
  elementVariants: any;
  containerVariants: any;
}

export function EmptyChatView({
  currentAgent,
  currentAgentInfo,
  availableAgents,
  input,
  isLoading,
  isTranscribing,
  isRecording,
  canShowToolsDropdown,
  isToolsOpen,
  setIsToolsOpen,
  selectedTools,
  availableWorkflows,
  isWorkflowsOpen,
  setIsWorkflowsOpen,
  selectedWorkflowId,
  textareaRef,
  toolsContainerRef,
  workflowsContainerRef,
  onAgentChange,
  onInfoClick,
  onInputChange,
  onKeyDown,
  onSend,
  onStartRecording,
  onStopRecording,
  onCancelRecording,
  onSelectTool,
  onRemoveSelectedTool,
  onSelectWorkflow,
  getToolDisplayName,
  className,
  elementVariants,
  containerVariants,
}: EmptyChatViewProps) {
  return (
    <motion.div 
      className={`flex flex-col h-full w-full items-center justify-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Agent Name */}
      <AgentHeader 
        agentName={currentAgentInfo?.name || currentAgent.charAt(0).toUpperCase() + currentAgent.slice(1)}
        agentDescription={currentAgentInfo?.description}
      />

      {/* Agent Selection */}
      <AgentSelector
        currentAgent={currentAgent}
        availableAgents={availableAgents}
        onAgentChange={onAgentChange}
        onInfoClick={onInfoClick}
        elementVariants={elementVariants}
      />

      <motion.div variants={elementVariants} className="w-full">
        <ChatInput
          input={input}
          isLoading={isLoading}
          isTranscribing={isTranscribing}
          isRecording={isRecording}
          canShowToolsDropdown={canShowToolsDropdown}
          isToolsOpen={isToolsOpen}
          setIsToolsOpen={setIsToolsOpen}
          selectedTools={selectedTools}
          currentAgentInfo={currentAgentInfo}
          getToolDisplayName={getToolDisplayName}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          onSend={onSend}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
          onCancelRecording={onCancelRecording}
          onSelectTool={onSelectTool}
          onRemoveSelectedTool={onRemoveSelectedTool}
          toolsContainerRef={toolsContainerRef}
          workflowsContainerRef={workflowsContainerRef}
          textareaRef={textareaRef}
          placeholder="Type your message..."
          availableWorkflows={availableWorkflows}
          isWorkflowsOpen={isWorkflowsOpen}
          setIsWorkflowsOpen={setIsWorkflowsOpen}
          selectedWorkflowId={selectedWorkflowId}
          onSelectWorkflow={onSelectWorkflow}
        />
      </motion.div>
    </motion.div>
  );
}

