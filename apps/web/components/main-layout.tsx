"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger, SidebarRail } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { useAgentChat } from "./providers/agent-chat-provider"
import { Button } from "./ui/button"
import { MoreHorizontal, Info, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { AgentInfoModal } from "./agent-info-modal"
import { ChatAgent } from "../interfaces/agentChatInterfaces"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { threads, currentThreadId, setMessages, setCurrentThreadId, currentAgent } = useAgentChat();
  const currentTitle = threads.find(t => t.threadId === currentThreadId)?.title || "DOPE Agents";
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [availableAgents, setAvailableAgents] = useState<ChatAgent[]>([]);

  // Fetch available agents
  useEffect(() => {
    const fetchAvailableAgents = async () => {
      try {
        const response = await fetch('/api/agents/chat');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const allowed = ['steve', 'hermes'];
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

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarRail />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-12 items-center justify-between gap-2 border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <div className="text-sm font-medium truncate flex items-center gap-2" title={currentTitle}>
              <Image src="/character.png" alt="Dope Agents" width={16} height={16} />
              {currentTitle}
            </div>
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
              <div className="dropdown-menu absolute right-0 top-9 z-50 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
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
        <main className="flex-1 min-h-0 p-4 md:p-6">
          {children}
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
