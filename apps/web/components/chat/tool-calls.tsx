"use client"

import { ArrowRight, BarChart3, ChevronDown, ChevronRight, Database, Settings } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "../ui/badge";

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
  'web_search': '🌐 Web Search',
  
  // MongoDB MCP Tools
  'mongodb_list_collections': '🗄️ List Collections',
  'mongodb_find': '🔍 Find Documents',
  'mongodb_aggregate': '📊 Aggregate Data',
  'mongodb_collection_schema': '📋 Collection Schema',
  'mongodb_insert': '➕ Insert Document',
  'mongodb_update': '✏️ Update Document',
  'mongodb_delete': '🗑️ Delete Document',
  'mongodb_count': '🔢 Count Documents',
};

interface ToolCallsProps {
  toolCalls?: Array<{ name: string, arguments: any, result?: any }>;
  messageIndex: number;
  expandedToolCalls: Set<number>;
  toggleToolCallsExpansion: (index: number) => void;
}

export function ToolCalls({ toolCalls, messageIndex, expandedToolCalls, toggleToolCallsExpansion }: ToolCallsProps) {
  if (!toolCalls || toolCalls.length === 0) return null;

  const isExpanded = expandedToolCalls.has(messageIndex);

  // Check if this is an agent handoff tool call
  const isAgentHandoff = (toolName: string) => {
    return toolName.includes('handoff') || toolName.includes('delegate') || toolName.includes('agent');
  };

  // Get tool display name with better formatting
  const getToolDisplayName = (toolName: string) => {
    return TOOL_DISPLAY_NAMES[toolName] || toolName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Format tool result for better display
  const formatToolResult = (result: any) => {
    if (typeof result === 'string') {
      return result;
    }
    if (result && typeof result === 'object') {
      // Handle agent tool results
      if (typeof result === 'string' && result.length > 0) {
        // This is likely an agent tool result
        return result;
      }
      // Check for other specific result structures
      if (result.success !== undefined) {
        return `✅ ${result.success ? 'Success' : 'Failed'}: ${result.message || JSON.stringify(result)}`;
      }
      if (result.found !== undefined) {
        return `🔍 ${result.found ? 'Found' : 'Not Found'}: ${JSON.stringify(result)}`;
      }
      return JSON.stringify(result, null, 2);
    }
    return String(result);
  };

  return (
    <div className="mt-3 max-w-full border-t border-border/30 pt-3">
      <button 
        onClick={() => toggleToolCallsExpansion(messageIndex)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-left group"
      >
        {isExpanded ? (
          <ChevronDown className="h-3 w-3 transition-transform" />
        ) : (
          <ChevronRight className="h-3 w-3 transition-transform" />
        )}
        <Settings className="h-3 w-3 group-hover:animate-spin" />
        <span className="font-medium">Tools used ({toolCalls.length})</span>
        {toolCalls.some(tc => isAgentHandoff(tc.name)) && (
          <Badge variant="outline" className="text-xs px-2 py-0.5">
            Agent Handoff
          </Badge>
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3">
          {toolCalls.map((toolCall, index) => (
            <div key={index} className={`rounded-lg border p-3 text-xs break-words transition-all ${isAgentHandoff(toolCall.name)
                ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
                : 'bg-muted/50 border-border/50'
              }`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded-md ${isAgentHandoff(toolCall.name)
                    ? 'bg-blue-100 dark:bg-blue-900/50'
                    : 'bg-muted'
                  }`}>
                  {isAgentHandoff(toolCall.name) ? (
                    <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Settings className="h-3 w-3" />
                  )}
                </div>
                <Badge
                  variant={isAgentHandoff(toolCall.name) ? "default" : "secondary"}
                  className="text-xs font-medium"
                >
                  {getToolDisplayName(toolCall.name)}
                </Badge>
                {isAgentHandoff(toolCall.name) && (
                  <Badge variant="outline" className="text-xs">
                    Handoff
                  </Badge>
                )}
              </div>

              {toolCall.arguments && Object.keys(toolCall.arguments).length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-2">
                    <Database className="h-3 w-3 text-muted-foreground" />
                    <strong className="text-muted-foreground">Input Parameters:</strong>
                  </div>
                  <div className="bg-background/50 rounded border p-2 max-h-32 overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap break-words">
                      {JSON.stringify(toolCall.arguments, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {toolCall.result && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <BarChart3 className="h-3 w-3 text-muted-foreground" />
                    <strong className="text-muted-foreground">Result:</strong>
                  </div>
                  <div className={`rounded border p-2 max-h-48 overflow-auto ${isAgentHandoff(toolCall.name)
                      ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
                      : 'bg-background/50'
                    }`}>
                    {typeof toolCall.result === 'string' ? (
                      <div className="text-xs [&_*]:break-words [&_*]:whitespace-pre-wrap">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}> 
                          {toolCall.result}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <pre className="text-xs whitespace-pre-wrap break-words">
                        {formatToolResult(toolCall.result)}
                      </pre>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

