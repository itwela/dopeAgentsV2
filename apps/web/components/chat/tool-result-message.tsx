"use client"

import { ChevronDown, ChevronRight, Settings } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage } from "../../interfaces/agentChatInterfaces";

interface ToolResultMessageProps {
  message: ChatMessage;
  messageIndex: number;
  expandedToolResults: Set<number>;
  toggleToolResultExpansion: (index: number) => void;
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

export function ToolResultMessage({ 
  message, 
  messageIndex, 
  expandedToolResults, 
  toggleToolResultExpansion 
}: ToolResultMessageProps) {
  const isExpanded = expandedToolResults.has(messageIndex);
  
  return (
    <div className="flex flex-col max-w-[95%] place-self-start">
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-2">
        <button
          onClick={() => toggleToolResultExpansion(messageIndex)}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-left group"
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3 transition-transform" />
          ) : (
            <ChevronRight className="h-3 w-3 transition-transform" />
          )}
          <Settings className="h-3 w-3 group-hover:animate-spin" />
          <span className="font-medium">Tool Output: {message.agentName}</span>
          <span className="text-xs opacity-50 ml-auto">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </button>
        
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
            <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-xl font-semibold mb-3 mt-4 text-foreground border-b border-border pb-1 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 mt-3 text-foreground first:mt-0">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-medium mb-2 mt-3 text-foreground first:mt-0">{children}</h3>,
                  p: ({ children }) => <p className="mb-3 text-foreground leading-6 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-3 ml-4 space-y-1 text-foreground [&>li]:list-disc last:mb-0">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 ml-4 space-y-1 text-foreground [&>li]:list-decimal last:mb-0">{children}</ol>,
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-gray-100 dark:bg-gray-800 text-foreground px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                    ) : (
                      <div className="mb-2 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                        <pre className="p-2 overflow-x-auto">
                          <code className="text-xs font-mono text-gray-800 dark:text-gray-200">{children}</code>
                        </pre>
                      </div>
                    );
                  },
                  pre: ({ children }) => children,
                }}
              >
                {extractContent(message.content)}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

