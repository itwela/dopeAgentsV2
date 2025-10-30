"use client"

import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage, ChatAgent } from "../../interfaces/agentChatInterfaces";
import { MessageActions } from "./message-actions";
import { ToolCalls } from "./tool-calls";

interface MessageBubbleProps {
  message: ChatMessage;
  messageIndex: number;
  availableAgents: ChatAgent[];
  copiedMessageIndex: number | null;
  expandedToolCalls: Set<number>;
  showKnowledgeModal: boolean;
  setShowKnowledgeModal: (show: boolean) => void;
  selectedMessageContent: string;
  setSelectedMessageContent: (content: string) => void;
  toggleToolCallsExpansion: (index: number) => void;
  onCopyMessage: (content: any, messageIndex: number) => void;
}

// Helper function to extract content from messages
const extractContent = (content: any): string => {
  if (typeof content === 'string') {
    return content;
  } else if (content && typeof content === 'object') {
    if (content.text) return content.text;
    if (content.content) return content.content;
    if (Array.isArray(content)) {
      return content.map(c =>
        typeof c === 'string' ? c : (c.text || c.content || JSON.stringify(c))
      ).join(' ');
    }
    return JSON.stringify(content);
  }
  return String(content || '');
};

const getMessageIcon = (role: string) => {
  switch (role) {
    case 'user':
      return <User className="h-4 w-4" />;
    case 'assistant':
      return <Bot className="h-4 w-4" />;
    default:
      return <Bot className="h-4 w-4" />;
  }
};

const getMessageBgColor = (role: string) => {
  switch (role) {
    case 'user':
      return 'glass-user-message text-black ml-12';
    case 'assistant':
      return 'bg-transparent mr-12';
    case 'system':
      return 'bg-transparent mx-12 text-center';
    default:
      return 'bg-transparent mr-12';
  }
};

export function MessageBubble({
  message,
  messageIndex,
  availableAgents,
  copiedMessageIndex,
  expandedToolCalls,
  showKnowledgeModal,
  setShowKnowledgeModal,
  selectedMessageContent,
  setSelectedMessageContent,
  toggleToolCallsExpansion,
  onCopyMessage,
}: MessageBubbleProps) {
  return (
    <div className={`flex flex-col ${message.role === 'user' ? 'max-w-[50%] place-self-end p-1 break-words' : 'max-w-[95%] place-self-start p-1 break-words'}`}>
      <div className={`rounded-lg p-3 ${getMessageBgColor(message.role)}`}>
        <div className="flex items-start gap-2">
          {message.role !== 'system' && (
            <div className="mt-0.5">
              {getMessageIcon(message.role)}
            </div>
          )}
          <div className="max-w-[80%]">
            <div className="flex items-center gap-2 mb-1">
              {message.agentName && (
                <span className="text-xs font-medium opacity-90 text-red-600">
                  {message.agentName}
                </span>
              )}
              <span className="text-xs opacity-50">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>

            <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-semibold mb-4 mt-6 text-foreground border-b border-border pb-2 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-5 text-foreground first:mt-0">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-medium mb-3 mt-4 text-foreground first:mt-0">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-base font-medium mb-2 mt-3 text-foreground first:mt-0">{children}</h4>,
                  p: ({ children }) => <p className="mb-4 text-foreground leading-7 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 ml-6 space-y-2 text-foreground [&>li]:list-disc last:mb-0">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-4 ml-6 space-y-2 text-foreground [&>li]:list-decimal last:mb-0">{children}</ol>,
                  li: ({ children }) => <li className="text-foreground leading-7">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  em: ({ children }) => <em className="italic text-foreground">{children}</em>,
                  code: ({ children, className }) => {
                    const isInline = !className;
                    const content = String(children);
                    const looksLikeEmailBundle = content.includes('📧') ||
                      (content.includes('**Option') && content.includes('**Subject:**') && content.includes('**Body:**')) ||
                      (content.includes('Option') && content.includes('Subject:') && content.includes('Body:'));

                    if (!isInline && looksLikeEmailBundle) {
                      return (
                        <div className="mb-4 rounded-lg border border-border bg-card p-4">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                        </div>
                      );
                    }

                    return isInline ? (
                      <code className="bg-gray-100 dark:bg-gray-800 text-foreground px-1.5 py-0.5 rounded-md text-sm font-mono">{children}</code>
                    ) : (
                      <div className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Code</span>
                        </div>
                        <pre className="p-4 overflow-x-auto">
                          <code className="text-sm font-mono text-gray-800 dark:text-gray-200 leading-relaxed">{children}</code>
                        </pre>
                      </div>
                    );
                  },
                  pre: ({ children }) => children,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg mb-4">{children}</blockquote>,
                  a: ({ href, children }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 decoration-1" target="_blank" rel="noopener noreferrer">{children}</a>,
                  hr: () => <hr className="border-gray-200 dark:border-gray-700 my-6" />,
                  table: ({ children }) => (
                    <div className="mb-4 overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>,
                  tbody: ({ children }) => <tbody className="bg-white dark:bg-gray-900">{children}</tbody>,
                  tr: ({ children }) => <tr className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">{children}</tr>,
                  th: ({ children }) => <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0">{children}</th>,
                  td: ({ children }) => <td className="px-4 py-3 text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 last:border-r-0">{children}</td>,
                }}
              >
                {extractContent(message.content)}
              </ReactMarkdown>
            </div>
            <ToolCalls 
              toolCalls={message.toolCalls} 
              messageIndex={messageIndex}
              expandedToolCalls={expandedToolCalls}
              toggleToolCallsExpansion={toggleToolCallsExpansion}
            />
          </div>
        </div>
        <MessageActions
          message={message}
          messageIndex={messageIndex}
          availableAgents={availableAgents}
          copiedMessageIndex={copiedMessageIndex}
          showKnowledgeModal={showKnowledgeModal}
          setShowKnowledgeModal={setShowKnowledgeModal}
          selectedMessageContent={selectedMessageContent}
          setSelectedMessageContent={setSelectedMessageContent}
          onCopyMessage={onCopyMessage}
        />
      </div>
    </div>
  );
}

