"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ReactNode } from "react";

const convex = new ConvexReactClient('https://original-turtle-96.convex.cloud');

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
      <ConvexAuthNextjsProvider client={convex}>{children}</ConvexAuthNextjsProvider>
  )
}

//    <ConvexProvider client={convex}>
  //  </ConvexProvider>


