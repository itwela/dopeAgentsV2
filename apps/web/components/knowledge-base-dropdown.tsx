"use client"

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Brain, X, Search, Plus, Database, FileText, Loader2, Check, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MetadataInput } from "./metadata-input";

interface KnowledgeBaseDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  messageContent?: string;
}

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
}

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: string;
  score: number;
}

export function KnowledgeBaseDropdown({ isOpen, onClose, messageContent }: KnowledgeBaseDropdownProps) {
  const [activeTab, setActiveTab] = useState<'search' | 'create' | 'list'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: '',
    content: '',
    type: 'general'
  });
  const [indexName, setIndexName] = useState<string>('');
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  const [existingIndexes, setExistingIndexes] = useState<string[]>([]);
  const [isLoadingIndexes, setIsLoadingIndexes] = useState(false);
  const [useCustomIndex, setUseCustomIndex] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load knowledge items on mount
  useEffect(() => {
    if (isOpen) {
      loadKnowledgeItems();
      fetchExistingIndexes();
    }
  }, [isOpen]);

  // Pre-fill form with message content if provided
  useEffect(() => {
    if (messageContent && isOpen) {
      setCreateForm(prev => ({
        ...prev,
        content: messageContent,
        title: messageContent.substring(0, 50) + (messageContent.length > 50 ? '...' : '')
      }));
    }
  }, [messageContent, isOpen]);

  const loadKnowledgeItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/knowledgebase/list-indexes');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setKnowledgeItems(data.indexes?.map((index: { name: string, title?: string, content?: string, type?: string, createdAt?: string }) => ({
          id: index.name,
          title: index.title || index.name,
          content: index.content || '',
          type: index.type || 'general',
          createdAt: index.createdAt || new Date().toISOString()
        })) || []);
      } else {
        setError('Failed to load knowledge items');
      }
    } catch (err) {
      setError('Error loading knowledge items');
      console.error('Error loading knowledge items:', err);
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
        const names = data.indexes?.map((idx: { name: string }) => idx.name) || [];
        setExistingIndexes(names);
        if (!useCustomIndex && names.length > 0 && !indexName) {
          setIndexName(names[0]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch indexes:", err);
    } finally {
      setIsLoadingIndexes(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError(null);
    try {
      const response = await fetch('/api/knowledgebase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          action: 'search'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSearchResults(data.results || []);
        } else {
          setError(data.error || 'Search failed');
        }
      } else {
        setError('Search failed');
      }
    } catch (err) {
      setError('Error performing search');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreate = async () => {
    if (!createForm.title.trim() || !createForm.content.trim()) {
      setError('Please fill in both title and content');
      return;
    }

    setIsCreating(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch('/api/knowledgebase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          indexName: indexName || 'general-knowledge',
          title: createForm.title,
          content: createForm.content,
          metadata: { type: createForm.type, ...metadata }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuccess('Knowledge item created successfully!');
          setCreateForm({ title: '', content: '', type: 'general' });
          loadKnowledgeItems(); // Refresh the list
        } else {
          setError(data.error || 'Failed to create knowledge item');
        }
      } else {
        setError('Failed to create knowledge item');
      }
    } catch (err) {
      setError('Error creating knowledge item');
      console.error('Create error:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-[50vw] bg-background rounded-lg border shadow-lg z-50 h-max flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <h2 className="text-sm font-semibold">Knowledge Base</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'search'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('search')}
          >
            <Search className="h-3 w-3 inline mr-1" />
            Search
          </button>
          <button
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'create'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('create')}
          >
            <Plus className="h-3 w-3 inline mr-1" />
            Create
          </button>
          <button
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'list'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('list')}
          >
            <Database className="h-3 w-3 inline mr-1" />
            All Items
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              {/* Search Tab */}
              {activeTab === 'search' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search knowledge base..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium">Search Results ({searchResults.length})</h3>
                      {searchResults.map((result) => (
                        <Card key={result.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{result.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {result.content}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {result.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Score: {Math.round(result.score * 100)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {searchResults.length === 0 && searchQuery && !isSearching && (
                    <div className="text-center py-8 text-muted-foreground">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}

              {/* Create Tab */}
              {activeTab === 'create' && (
                <div className="space-y-4">
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
                      <p className="text-xs text-muted-foreground">Loading existing indexes...</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={createForm.title}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter a title for this knowledge item"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={createForm.type} onValueChange={(value) => setCreateForm(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="email">Email Template</SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="client">Client Info</SelectItem>
                        <SelectItem value="process">Process</SelectItem>
                        <SelectItem value="faq">FAQ</SelectItem>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="procedure">Procedure</SelectItem>
                        <SelectItem value="guideline">Guideline</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="reference">Reference</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={createForm.content}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Enter the content for this knowledge item"
                      rows={8}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Metadata (Optional)</Label>
                    <MetadataInput indexName={indexName} metadata={metadata} onChange={setMetadata} />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check className="h-4 w-4" />
                      {success}
                    </div>
                  )}

                  <Button onClick={handleCreate} disabled={isCreating || (!indexName && useCustomIndex)} className="w-full">
                    {isCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Knowledge Item
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* List Tab */}
              {activeTab === 'list' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">All Knowledge Items ({knowledgeItems.length})</h3>
                    <Button variant="outline" size="sm" onClick={loadKnowledgeItems} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Refresh'
                      )}
                    </Button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  {knowledgeItems.length > 0 ? (
                    <div className="space-y-3">
                      {knowledgeItems.map((item) => (
                        <Card key={item.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {item.content}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {item.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(item.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      {isLoading ? 'Loading...' : 'No knowledge items found'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
  );
}
