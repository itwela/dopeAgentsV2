"use client"

import { Home, Settings, Users, FileText, BarChart, Database, Workflow } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar"
import { ThreadSidebar } from "./thread-sidebar"
import { useAuthActions } from "@convex-dev/auth/react"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"
import { Button } from "./ui/button"
import Image from "next/image"

// Menu items
const items = [
  {
    title: "Agents",
    url: "/agents",
    icon: Users,
  },
  {
    title: "Workflows",
    url: "/workflows",
    icon: Workflow,
  },
  {
    title: "Knowledgebase",
    url: "/knowledgebase",
    icon: Database,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAgentsRoute = pathname === '/agents';
  const { signOut } = useAuthActions();
  const currentUser = useQuery(api.auth.currentUser);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { state, isMobile, openMobile } = useSidebar();
  const isExpanded = isMobile ? openMobile : state === "expanded";

  useEffect(() => {
    if (!isExpanded && userMenuOpen) setUserMenuOpen(false);
  }, [isExpanded, userMenuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Sidebar collapsible="icon" className="glass-sidebar">
      <SidebarHeader className="border-b glass-sidebar">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full gap-2">
            <SidebarTrigger className="hidden md:inline-flex h-8 w-8 p-0 hover:text-primary" />
          </div>
          {/* Sign out moved to user menu in footer */}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Only show conversations on agents route */}
        {isAgentsRoute && isExpanded && (
          <SidebarGroup className="p-0 m-0">
            <SidebarGroupContent className="p-0 m-0">
              <ThreadSidebar className="h-96 p-0 m-0" />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter className="border-t relative glass-sidebar">
        {isExpanded && (
          <>
            <button
              type="button"
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center justify-between w-full text-left p-4 border-0 hover:bg-muted/30 rounded transition-colors"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
            >
              <div className="flex flex-col">
                {currentUser?.name && (
                  <span className="text-xs text-muted-foreground mt-1 hover:text-foreground transition-colors">
                    {currentUser.name}
                  </span>
                )}
              </div>
            </button>
            {userMenuOpen && (
              <div className="absolute place-self-center bottom-12 z-50 min-w-[160px] w-full rounded-xl glass-dropdown p-1">
                <button
                  type="button"
                  className="block w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
