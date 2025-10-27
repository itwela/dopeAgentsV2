import { Badge } from "./ui/badge";
import { AuroraText } from "./ui/aurora-text";
import { TextAnimate } from "./ui/text-animate";

interface AgentHeaderProps {
  agentName: string;
  agentDescription?: string;
}

export function AgentHeader({ agentName, agentDescription }: AgentHeaderProps) {
  const isHermes = agentName?.toLowerCase() === 'hermes';
  
  return (
    <div className="mb-8 text-center glass-float">
      <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
        <AuroraText className="text-3xl">
          {agentName}
        </AuroraText>
        <Badge variant="secondary" className="text-xs glass-button">Account Manager</Badge>
      </h1>
      {/* <TextAnimate animation="fadeIn" by="word" duration={0.8} delay={0.3}>
        <p className="text-muted-foreground">
          {isHermes
            ? 'Hermes is optimized as an account manager assistant: summarizing health, prepping QBRs, and surfacing upsell opportunities.'
            : (agentDescription || 'AI Assistant')}
        </p>
      </TextAnimate> */}
    </div>
  );
}

