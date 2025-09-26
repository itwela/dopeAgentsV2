"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface AgentFormProps {
  onSubmit?: (agent: AgentFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<AgentFormData>;
}

export interface AgentFormData {
  name: string;
  description: string;
  model: string;
  capabilities: string[];
}

const availableCapabilities = [
  "text-generation",
  "sentiment-analysis", 
  "ticket-routing",
  "data-analysis",
  "visualization",
  "reporting",
  "content-generation",
  "social-media",
  "seo-optimization",
  "code-review",
  "debugging",
  "documentation",
  "translation",
  "summarization",
  "question-answering",
];

const availableModels = [
  "gpt-4",
  "gpt-3.5-turbo",
  "claude-3-haiku",
  "claude-3-sonnet",
  "llama-2",
];

export function AgentForm({ onSubmit, onCancel, initialData }: AgentFormProps) {
  const [formData, setFormData] = useState<AgentFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    model: initialData?.model || "gpt-4",
    capabilities: initialData?.capabilities || [],
  });
  
  const [newCapability, setNewCapability] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const addCapability = (capability: string) => {
    if (capability && !formData.capabilities.includes(capability)) {
      setFormData(prev => ({
        ...prev,
        capabilities: [...prev.capabilities, capability]
      }));
    }
    setNewCapability("");
  };

  const removeCapability = (capability: string) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.filter(c => c !== capability)
    }));
  };

  const addCustomCapability = () => {
    if (newCapability.trim()) {
      addCapability(newCapability.trim());
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Agent</CardTitle>
        <CardDescription>
          Configure your AI agent with specific capabilities and settings
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                placeholder="e.g., Customer Support Agent"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this agent does..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">AI Model</Label>
              <Select
                value={formData.model}
                onValueChange={(value) => setFormData(prev => ({ ...prev, model: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Capabilities</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.capabilities.map((capability) => (
                  <Badge key={capability} variant="secondary" className="gap-1">
                    {capability}
                    <button
                      type="button"
                      onClick={() => removeCapability(capability)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Add from available capabilities:</Label>
                <div className="flex flex-wrap gap-2">
                  {availableCapabilities
                    .filter(cap => !formData.capabilities.includes(cap))
                    .map((capability) => (
                      <Button
                        key={capability}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addCapability(capability)}
                        className="text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {capability}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom capability..."
                  value={newCapability}
                  onChange={(e) => setNewCapability(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomCapability())}
                />
                <Button type="button" onClick={addCustomCapability} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Create Agent
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
