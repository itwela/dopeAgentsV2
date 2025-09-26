"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AgentChatProvider } from "../../components/providers/agent-chat-provider";
import { ReactNode } from "react";

interface AgentChatWrapperProps {
  children: ReactNode;
}

export default function AgentChatWrapper({ children }: AgentChatWrapperProps) {
  const currentUser = useQuery(api.auth.currentUser);
  
  return (
    <AgentChatProvider userId={currentUser?.subject}>
      {children}
    </AgentChatProvider>
  );
}
