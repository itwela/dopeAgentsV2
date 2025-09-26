"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent } from './ui/card';
import { Plus, MessageSquare, Clock, Trash2, X } from 'lucide-react';
import { useAgentChat } from './providers/agent-chat-provider';

interface ThreadSidebarProps {
  className?: string;
}

export const ThreadSidebar: React.FC<ThreadSidebarProps> = ({ className }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState<string | null>(null);
  
  const {
    threads,
    currentThreadId,
    createNewThread,
    selectThread,
    deleteThread,
    currentAgent,
  } = useAgentChat();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation(); // Prevent thread selection when clicking delete
    setThreadToDelete(threadId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (threadToDelete) {
      await deleteThread(threadToDelete);
      setDeleteModalOpen(false);
      setThreadToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setThreadToDelete(null);
  };

  // Get unique agents used in a thread's history
  const getUniqueAgentsInThread = (thread: any) => {
    const agents = new Set<string>();
    
    // Add the main agent for the thread
    agents.add(thread.agentId);
    
    // Check history for other agents
    if (thread.history) {
      thread.history.forEach((item: any) => {
        if (item.role === 'assistant' && item.agentName) {
          // Map agent names to IDs
          const agentId = item.agentName.toLowerCase().replace(/\s+/g, '-');
          agents.add(agentId);
        }
      });
    }
    
    return Array.from(agents);
  };

  const getAgentAvatar = (agentId: string) => {
    switch (agentId) {
      case 'hermes':
        return { initials: 'HER', color: 'bg-red-500' };
      case 'steve':
        return { initials: 'STE', color: 'bg-red-500' };
      case 'atlas':
        return { initials: 'ATL', color: 'bg-red-500' };
      case 'juno':
        return { initials: 'JUN', color: 'bg-red-500' };
      case 'dope-admin':
        return { initials: 'DOP', color: 'bg-red-500' };
      default:
        return { initials: agentId.substring(0, 2).toUpperCase(), color: 'bg-gray-400' };
    }
  };


  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="p-2 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Conversations</span>
          <Button
            onClick={createNewThread}
            size="sm"
            className="h-8 w-8 p-0"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Threads List */}
      <ScrollArea className="flex-1 w-full">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No conversations yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start a new chat to begin
            </p>
          </div>
        ) : (
          <div className="space-y-2 w-[95%] place-self-center py-4 ">
            {threads.map((thread) => (
              <Card
                key={thread.threadId}
                className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  currentThreadId === thread.threadId
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => selectThread(thread.threadId)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-2">
                      <h3 className="text-sm font-medium text-foreground truncate mb-1">
                        {thread.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(thread.lastUpdated)}</span>
                        </div>
                        
                        {/* Agent Avatars */}
                        <div className="flex items-center -space-x-1">
                          {getUniqueAgentsInThread(thread).slice(0, 2).map((agentId, index) => {
                            const agent = getAgentAvatar(agentId);
                            return (
                              <div
                                key={agentId}
                                className={`w-10 h-6 rounded-full ${agent.color} flex items-center justify-center text-white border-2 border-background shadow-sm`}
                                style={{ zIndex: 10 - index }}
                                title={agentId.charAt(0).toUpperCase() + agentId.slice(1)}
                              >
                                <span className="text-xs font-semibold leading-none">{agent.initials}</span>
                              </div>
                            );
                          })}
                          {getUniqueAgentsInThread(thread).length > 2 && (
                            <div
                              className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground border-2 border-background shadow-sm"
                              title={`+${getUniqueAgentsInThread(thread).length - 4} more agents`}
                            >
                              <span className="text-xs font-medium">+{getUniqueAgentsInThread(thread).length - 4}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => handleDeleteClick(e, thread.threadId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-sm w-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold">Delete Conversation</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelDelete}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Are you sure you want to delete this conversation? This action cannot be undone.
              </p>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
