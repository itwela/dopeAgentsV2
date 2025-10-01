"use client"

import { Home, Settings, Users, FileText, BarChart, Database, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
} from "./ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import { ThreadSidebar } from "./thread-sidebar"
import { useAuthActions } from "@convex-dev/auth/react"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"
import { Button } from "./ui/button"

// Menu items
const items = [
  {
    title: "Agents",
    url: "/agents",
    icon: Users,
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

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <span className="text-sm font-bold">A</span>
            </div>
            <span className="text-lg font-semibold">DOPE Agents</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="h-8 w-8 p-0"
          >
            <LogOut className="h-4 w-4" />
          </Button>
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
        {isAgentsRoute && (
          <SidebarGroup className="p-0 m-0">
            <SidebarGroupContent className="p-0 m-0">
              <ThreadSidebar className="h-96 p-0 m-0" />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {currentUser?.name && (
              <span className="text-xs text-muted-foreground mt-1">
                {currentUser.name}
              </span>
            )}
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
