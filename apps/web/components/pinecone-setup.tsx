"use client";

import { AlertCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function PineconeSetup() {
  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <AlertCircle className="h-5 w-5" />
          Pinecone Setup Required
        </CardTitle>
        <CardDescription className="text-amber-700 dark:text-amber-300">
          To use the knowledgebase feature, you need to configure your Pinecone API key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-amber-800 dark:text-amber-200">Setup Instructions:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700 dark:text-amber-300">
            <li>
              Get your API key from{" "}
              <a 
                href="https://app.pinecone.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline hover:no-underline"
              >
                Pinecone Console
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>Create a <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">.env.local</code> file in your project root</li>
            <li>Add: <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">PINECONE_API_KEY=your_api_key_here</code></li>
            <li>Restart your development server</li>
          </ol>
        </div>
        
        <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-md">
          <p className="text-xs text-amber-800 dark:text-amber-200 font-mono">
            # .env.local<br />
            PINECONE_API_KEY=your_pinecone_api_key_here
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
