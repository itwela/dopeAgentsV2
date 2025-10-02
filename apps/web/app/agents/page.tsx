"use client"

import { useState, useEffect } from "react";
import { MainLayout } from "../../components/main-layout";
import { AgentChat } from "../../components/agent-chat";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function AgentsPage() {
  const [hasMessages, setHasMessages] = useState(false);
  const isAuthed = useQuery(api.auth.isAuthenticated, {});
  const router = useRouter();

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
