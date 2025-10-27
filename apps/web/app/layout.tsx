import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "./providers/ConvexClientProvider";
import AgentChatWrapper from "./providers/AgentChatWrapper";
import { UserDataProvider } from "../components/providers/userDataProvider";


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
        className={`antialiased min-h-screen`}
        >
        <ConvexAuthNextjsServerProvider>
            <ConvexClientProvider>
              <UserDataProvider>
                <AgentChatWrapper>
                  {children}
                </AgentChatWrapper>
              </UserDataProvider>
            </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}
