"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

export default function Home() {
  const router = useRouter();
  const isAuthed = useQuery(api.auth.currentUser, {});

  useEffect(() => {
   
    if (isAuthed === null) {
      console.log("isAuthed is null");
      return;
    }

    if (isAuthed === undefined) {
      console.log("isAuthed is undefined - redirecting to signin");
      router.push("/signin");
    }

  }, [isAuthed, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
    </div>
  );
}
