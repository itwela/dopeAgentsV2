import { PromptCardData } from "../interfaces/agentChatInterfaces";

export function PromptCard({ data, onSelect }: { data: PromptCardData; onSelect: (text: string) => void }) {
    return (
      <button
        className="rounded-xl glass-card hover:glass-button transition-all duration-300 text-left p-4 glass-float"
        onClick={() => onSelect(data.prompt)}
      >
        <div className="text-sm font-medium text-foreground">{data.title}</div>
        <div className="text-xs mt-1 text-muted-foreground line-clamp-2">{data.prompt}</div>
      </button>
    );
  }