"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger, SidebarRail } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { useAgentChat } from "./providers/agent-chat-provider"
import { Button } from "./ui/button"
import { MoreHorizontal, Info, RefreshCw, Pencil, Check, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { AgentInfoModal } from "./agent-info-modal"
import { ChatAgent } from "../interfaces/agentChatInterfaces"
import { Input } from "./ui/input"
import { useMutation } from "convex/react"
import { api } from "../convex/_generated/api"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { threads, currentThreadId, setMessages, setCurrentThreadId, currentAgent, loadThreads, userId, userName } = useAgentChat();
  const currentTitle = threads.find(t => t.threadId === currentThreadId)?.title || "DOPE Agents";
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [availableAgents, setAvailableAgents] = useState<ChatAgent[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  
  const updateThreadTitle = useMutation(api.threads.updateThreadTitle);

  // Fetch available agents
  useEffect(() => {
    const fetchAvailableAgents = async () => {
      try {
        const response = await fetch('/api/agents/chat');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const allowed = ['steve', 'hermes', 'dope-admin'];
            const filtered = (data.data || []).filter((agent: ChatAgent) => {
              const name = agent?.name?.toLowerCase?.();
              const id = agent?.id?.toLowerCase?.();
              return allowed.includes(name) || allowed.includes(id);
            });
            setAvailableAgents(filtered);
          }
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAvailableAgents();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking inside the dropdown
      if (target.closest('.dropdown-menu')) {
        return;
      }
      setShowDropdown(false);
    };
    
    // Small delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const clearChat = () => {
    setMessages([]);
    setCurrentThreadId(null);
  };

  const handleEditTitle = () => {
    if (currentThreadId && currentTitle !== "DOPE Agents") {
      setEditedTitle(currentTitle);
      setIsEditingTitle(true);
    }
  };

  const handleSaveTitle = async () => {
    if (currentThreadId && editedTitle.trim() && editedTitle !== currentTitle) {
      try {
        await updateThreadTitle({ threadId: currentThreadId, title: editedTitle.trim() });
        // Reload threads to show the updated title immediately
        await loadThreads(userId, userName);
      } catch (error) {
        console.error("Failed to update thread title:", error);
      }
    }
    setIsEditingTitle(false);
    setEditedTitle("");
  };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
    setEditedTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarRail />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-12 items-center justify-between gap-2 border-b glass-sidebar px-4 md:px-6">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <SidebarTrigger className="md:hidden" />
            <Image src="/character.png" alt="Dope Agents" width={16} height={16} className="flex-shrink-0" />
            {isEditingTitle ? (
              <div className="flex items-center gap-1 flex-1 min-w-0">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-7 text-sm flex-1"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950 flex-shrink-0"
                  onClick={handleSaveTitle}
                >
                  <Check className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground flex-shrink-0"
                  onClick={handleCancelEdit}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1 group cursor-pointer flex-1 min-w-0" onClick={handleEditTitle}>
                <div className="text-sm font-medium truncate" title={currentTitle}>
                  {currentTitle}
                </div>
                {currentThreadId && currentTitle !== "DOPE Agents" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTitle();
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {showDropdown && (
              <div className="dropdown-menu absolute right-0 top-9 z-50 w-48 rounded-xl glass-dropdown p-1 text-popover-foreground shadow-lg">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Agent Info clicked');
                    setShowInfoModal(true);
                    setShowDropdown(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  <Info className="h-4 w-4" />
                  Agent Info
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Reset Chat clicked');
                    clearChat();
                    setShowDropdown(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Chat
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 min-h-0 p-4 md:p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 via-red-100/10 to-red-200/20 pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </SidebarInset>
      
      <AgentInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        currentAgent={currentAgent}
        availableAgents={availableAgents}
      />
    </SidebarProvider>
  )
}
