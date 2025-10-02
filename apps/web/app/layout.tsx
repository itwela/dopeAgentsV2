import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "./providers/ConvexClientProvider";
import AgentChatWrapper from "./providers/AgentChatWrapper";


export const metadata: Metadata = {
  title: "Agents 2025 - DOPE",
  description: "AI Agents platform for 2025",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
        >
        <ConvexAuthNextjsServerProvider>
            <ConvexClientProvider>
              <AgentChatWrapper>
                {children}
              </AgentChatWrapper>
            </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}
