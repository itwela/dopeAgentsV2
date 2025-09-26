"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2, Plus, Database, ChevronDown, ChevronRight } from "lucide-react";
import { MetadataInput } from "./metadata-input";

interface KnowledgebaseData {
  indexName: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export function KnowledgebaseForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [createIndexName, setCreateIndexName] = useState("");
  const [indexName, setIndexName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [existingIndexes, setExistingIndexes] = useState<string[]>([]);
  const [isLoadingIndexes, setIsLoadingIndexes] = useState(false);
  const [useCustomIndex, setUseCustomIndex] = useState(false);
  const [isCreateIndexExpanded, setIsCreateIndexExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      let data: KnowledgebaseData;

      if (indexName === 'dope-employee-data') {
        // For employee data, use the metadata as the main content
        const employeeContent = `Employee: ${metadata.name || ''}
Position: ${metadata.position || ''}
Organization: ${metadata.organization || ''}
Reports To: ${metadata.reportsTo || ''}
Lead Domain: ${metadata.leadDomain || ''}
Assessment Date: ${metadata.assessmentDate || ''}

Strengths: ${Array.isArray(metadata.all34) ? metadata.all34.join(', ') : metadata.all34 || ''}

Best Collaboration: ${metadata.bestCollabWith || ''}

Communication Tips: ${metadata.communicationTips || ''}

How to Coach: ${metadata.howToCoach || ''}

Motivators: ${Array.isArray(metadata.motivators) ? metadata.motivators.join(', ') : metadata.motivators || ''}

Demotivators: ${Array.isArray(metadata.demotivators) ? metadata.demotivators.join(', ') : metadata.demotivators || ''}

Watchouts: ${metadata.watchouts || ''}`;

        data = {
          indexName,
          title: metadata.name || 'Employee Profile',
          content: employeeContent,
          metadata,
        };
      } else {
        // For other index types, use the standard title/content
        data = {
          indexName,
          title,
          content,
          metadata,
        };
      }

      const response = await fetch("/api/knowledgebase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add to knowledgebase");
      }

      const result = await response.json();
      setSuccess("Successfully added to knowledgebase!");
      setTitle("");
      setContent("");
      setMetadata({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchExistingIndexes = async () => {
    setIsLoadingIndexes(true);
    try {
      const response = await fetch("/api/knowledgebase/list-indexes");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setExistingIndexes(data.indexes?.map((index: { name: string }) => index.name) || []);
      }
    } catch (err) {
      console.error("Failed to fetch indexes:", err);
    } finally {
      setIsLoadingIndexes(false);
    }
  };

  useEffect(() => {
    fetchExistingIndexes();
  }, []);

  const handleCreateIndex = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/knowledgebase/create-index", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ indexName: createIndexName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create index");
      }

      setSuccess("Index created successfully!");
      // Refresh the indexes list
      fetchExistingIndexes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Index Section */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setIsCreateIndexExpanded(!isCreateIndexExpanded)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Create Index
            </CardTitle>
            {isCreateIndexExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          {isCreateIndexExpanded && (
            <CardDescription>
              Create a new Pinecone index before adding data. This only needs to be done once per index.
            </CardDescription>
          )}
        </CardHeader>
        {isCreateIndexExpanded && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-index-name">Index Name</Label>
              <Input
                id="create-index-name"
                value={createIndexName}
                onChange={(e) => setCreateIndexName(e.target.value)}
                placeholder="my-new-index"
              />
            </div>
            <Button onClick={handleCreateIndex} disabled={isLoading || !createIndexName}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Database className="mr-2 h-4 w-4" />
              )}
              Create Index
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Add Data Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Data to Knowledgebase
          </CardTitle>
          <CardDescription>
            Add documents, text, or other data to your Pinecone vector database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="index-select">Index Name</Label>
              {existingIndexes.length > 0 && !useCustomIndex ? (
                <div className="space-y-2">
                  <Select value={indexName} onValueChange={(value: string) => {
                    if (value === "custom") {
                      setUseCustomIndex(true);
                      setIndexName("");
                    } else {
                      setIndexName(value);
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select existing index or create new" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingIndexes.map((index) => (
                        <SelectItem key={index} value={index}>
                          {index}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">+ Enter custom index name</SelectItem>
                    </SelectContent>
                  </Select>
                  {indexName && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUseCustomIndex(true);
                        setIndexName("");
                      }}
                    >
                      Enter custom index name
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    id="index-select"
                    value={indexName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIndexName(e.target.value)}
                    placeholder="Enter index name"
                  />
                  {existingIndexes.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUseCustomIndex(false);
                        setIndexName("");
                      }}
                    >
                      Select from existing indexes
                    </Button>
                  )}
                </div>
              )}
              {isLoadingIndexes && (
                <p className="text-sm text-muted-foreground">Loading existing indexes...</p>
              )}
            </div>

            {indexName === 'dope-employee-data' ? (
              // Employee data specific fields
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID *</Label>
                  <Input
                    id="employeeId"
                    value={metadata.employeeId || ""}
                    onChange={(e) => setMetadata({ ...metadata, employeeId: e.target.value })}
                    placeholder="E-XXX-0001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={metadata.name || ""}
                    onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                    placeholder="JOHN DOE"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={metadata.position || ""}
                    onChange={(e) => setMetadata({ ...metadata, position: e.target.value })}
                    placeholder="Software Engineer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={metadata.organization || ""}
                    onChange={(e) => setMetadata({ ...metadata, organization: e.target.value })}
                    placeholder="DOPE Marketing"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportsTo">Reports To</Label>
                  <Input
                    id="reportsTo"
                    value={metadata.reportsTo || ""}
                    onChange={(e) => setMetadata({ ...metadata, reportsTo: e.target.value })}
                    placeholder="Manager Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assessmentDate">Assessment Date</Label>
                  <Input
                    id="assessmentDate"
                    type="date"
                    value={metadata.assessmentDate || ""}
                    onChange={(e) => setMetadata({ ...metadata, assessmentDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leadDomain">Lead Domain</Label>
                  <Select value={metadata.leadDomain || ""} onValueChange={(value) => setMetadata({ ...metadata, leadDomain: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Executing">Executing</SelectItem>
                      <SelectItem value="Influencing">Influencing</SelectItem>
                      <SelectItem value="Relationship Building">Relationship Building</SelectItem>
                      <SelectItem value="Strategic Thinking">Strategic Thinking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="all34">All 34 Strengths (comma-separated)</Label>
                  <Textarea
                    id="all34"
                    value={Array.isArray(metadata.all34) ? metadata.all34.join(", ") : metadata.all34 || ""}
                    onChange={(e) => setMetadata({ ...metadata, all34: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    placeholder="Developer, Woo, Strategic, Empathy, Learner..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bestCollabWith">Best Collaboration With</Label>
                  <Textarea
                    id="bestCollabWith"
                    value={metadata.bestCollabWith || ""}
                    onChange={(e) => setMetadata({ ...metadata, bestCollabWith: e.target.value })}
                    placeholder="Description of who this person collaborates best with..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communicationTips">Communication Tips</Label>
                  <Textarea
                    id="communicationTips"
                    value={metadata.communicationTips || ""}
                    onChange={(e) => setMetadata({ ...metadata, communicationTips: e.target.value })}
                    placeholder="How to communicate effectively with this person..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="howToCoach">How to Coach</Label>
                  <Textarea
                    id="howToCoach"
                    value={metadata.howToCoach || ""}
                    onChange={(e) => setMetadata({ ...metadata, howToCoach: e.target.value })}
                    placeholder="Coaching guidance for this person..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivators">Motivators (comma-separated)</Label>
                  <Input
                    id="motivators"
                    value={Array.isArray(metadata.motivators) ? metadata.motivators.join(", ") : metadata.motivators || ""}
                    onChange={(e) => setMetadata({ ...metadata, motivators: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    placeholder="Cultivating Potential, Strategic Problem Solving..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demotivators">Demotivators (comma-separated)</Label>
                  <Input
                    id="demotivators"
                    value={Array.isArray(metadata.demotivators) ? metadata.demotivators.join(", ") : metadata.demotivators || ""}
                    onChange={(e) => setMetadata({ ...metadata, demotivators: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    placeholder="Lack of Individual Development, Unrefined Ideas..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="watchouts">Watchouts</Label>
                  <Textarea
                    id="watchouts"
                    value={metadata.watchouts || ""}
                    onChange={(e) => setMetadata({ ...metadata, watchouts: e.target.value })}
                    placeholder="Things to be cautious about with this person..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            ) : (
              // Generic title and content fields for other index types
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Document title or identifier"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter the text content you want to add to the knowledgebase..."
                    className="min-h-[200px]"
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Metadata (Optional)</Label>
              <MetadataInput
                indexName={indexName}
                metadata={metadata}
                onChange={setMetadata}
              />
              <p className="text-sm text-muted-foreground">
                Add structured metadata that will be stored alongside your content for better organization and searchability.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={
                isLoading ||
                (indexName === 'dope-employee-data'
                  ? !metadata.employeeId || !metadata.name || !metadata.position
                  : !title || !content
                )
              }
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Add to Knowledgebase
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
