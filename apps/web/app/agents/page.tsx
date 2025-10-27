"use client"

import { useState, useEffect } from "react";
import { MainLayout } from "../../components/main-layout";
import { AgentChat } from "../../components/agent-chat";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useAgentChat } from "../../components/providers/agent-chat-provider";

export default function AgentsPage() {
  const [hasMessages, setHasMessages] = useState(false);
  const isAuthed = useQuery(api.auth.isAuthenticated, {});
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCurrentThreadId } = useAgentChat();
  
  // Handle threadId from query parameter (for workflow chat integration)
  useEffect(() => {
    const threadId = searchParams.get('threadId');
    if (threadId) {
      setCurrentThreadId(threadId);
      // Clean up URL after loading thread
      router.replace('/agents');
    }
  }, [searchParams, setCurrentThreadId, router]);

  useEffect(() => {
    if (isAuthed === undefined) return;
    if (isAuthed === false) router.push("/signin");
  }, [isAuthed, router]);

  return (
    <MainLayout>
      <div className="h-full w-full overflow-hidden">
        {/* Chat Interface */}
        <div className={`h-[calc(100vh-4rem)] flex md:h-[calc(100vh-5rem)] overflow-hidden ${hasMessages ? 'w-full md:max-w-[calc(100vw-8rem)] place-self-center overflow-hidden' : 'w-full md:max-w-4xl mx-auto'}`}>
          <AgentChat onMessagesChange={setHasMessages} hasMessages={hasMessages} />
        </div>
      </div>
    </MainLayout>
  );
}
