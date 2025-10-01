"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent } from './ui/card';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
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

  // Agents badges removed per request


  return (
    <div className={`flex flex-col h-full p-0 m-0 ${className}`}>
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
      <ScrollArea className="w-[100%] p-0">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No conversations yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start a new chat to begin
            </p>
          </div>
        ) : (
          <div className="space-y-2 w-[90%] flex flex-col  pl-2 py-4 ">
            {threads.map((thread) => (
              <Card
                key={thread.threadId}
                className={`cursor-pointer p-0 transition-all duration-200 hover:shadow-sm ${
                  currentThreadId === thread.threadId
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => selectThread(thread.threadId)}
              >
                <CardContent className="p-1 px-3">
                  <div className="flex items-center justify-between">
                    
                    <div className="flex-1 min-w-0 max-w-[100px] mr-2">
                      <h3 className="text-sm font-medium text-foreground truncate mb-1">
                        {thread.title}
                      </h3>
                      <div className="h-0.5" />
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
