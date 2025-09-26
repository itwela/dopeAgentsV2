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
      <div className="h-full overflow-hidden">
        {/* Chat Interface */}
        <div className={`h-[85vh] overflow-hidden ${hasMessages ? 'w-full max-w-[80vw] h-full' : 'max-w-4xl place-self-center'}`}>
          <AgentChat onMessagesChange={setHasMessages} hasMessages={hasMessages} />
        </div>
      </div>
    </MainLayout>
  );
}
