import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import { EmployeeDataInput, TranscriptDataInput } from '../types/metadata';

// Employee data interface based on the metadata types
interface EmployeeData {
  employeeId: string;
  name: string;
  organization: string;
  position: string;
  reportsTo: string;
  gender?: string | null;
  assessmentDate: string;
  all34: string[];
  leadDomain: 'Executing' | 'Influencing' | 'Relationship Building' | 'Strategic Thinking';
  themeDomains: {
    Executing: string[];
    Influencing: string[];
    RelationshipBuilding: string[];
    StrategyThinking: string[];
  };
  bestCollabWith: string;
  communicationTips: string;
  howToCoach: string;
  motivators: string[];
  demotivators: string[];
  watchouts: string;
  evidenceQuotes: Array<{
    quote: string;
    section: string;
  }>;
  sourceDocUrl?: string | null;
  sourceProvenance?: string | null;
}

dotenv.config();

// Get API key from environment variables
export const getApiKey = () => {
  const apiKey = process.env.PINECONE_API_KEY

  return apiKey;
};

const pc = new Pinecone({
  apiKey: getApiKey()
});

export { pc };

// Create a new index with embeddings model
export async function createIndex(indexName: string) {
  try {
    await pc.createIndexForModel({
      name: indexName,
      cloud: 'aws',
      region: 'us-east-1',
      embed: {
        model: 'llama-text-embed-v2',
        fieldMap: { text: 'chunk_text' },
      },
      waitUntilReady: true,
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating index:', error);
    throw new Error(`Failed to create index: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to estimate metadata size in bytes
function estimateMetadataSize(metadata: Record<string, any>): number {
  return JSON.stringify(metadata).length * 2; // Rough estimate (UTF-16)
}

// Helper function to split large metadata into smaller chunks
function splitMetadata(metadata: Record<string, any>, maxSizeBytes: number = 30000): Record<string, any>[] {
  const metadataStr = JSON.stringify(metadata);
  const estimatedSize = metadataStr.length * 2;

  if (estimatedSize <= maxSizeBytes) {
    return [metadata];
  }

  // Split large arrays and strings
  const chunks: Record<string, any>[] = [];
  const baseMetadata = { ...metadata };

  // Handle large array fields
  const arrayFields = ['participants', 'action_items', 'concepts_discussed', 'key_topics'];

  for (const field of arrayFields) {
    if (Array.isArray(baseMetadata[field]) && baseMetadata[field].length > 10) {
      const items = baseMetadata[field];
      const chunkSize = Math.ceil(items.length / Math.ceil(estimatedSize / maxSizeBytes));

      for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = {
          ...baseMetadata,
          [field]: items.slice(i, i + chunkSize),
          chunk_index: Math.floor(i / chunkSize),
          total_chunks: Math.ceil(items.length / chunkSize)
        };
        chunks.push(chunk);
      }

      // Remove the original field from base metadata
      delete baseMetadata[field];
    }
  }

  // If no chunks were created, create one with reduced metadata
  if (chunks.length === 0) {
    const reducedMetadata = { ...baseMetadata };
    // Remove or truncate large string fields
    if (reducedMetadata.summary && reducedMetadata.summary.length > 1000) {
      reducedMetadata.summary = reducedMetadata.summary.substring(0, 1000) + '...';
    }
    chunks.push(reducedMetadata);
  }

  return chunks;
}

// Helper function to chunk large content
function chunkContent(content: string, maxChunkSize: number = 2000): string[] {
  if (content.length <= maxChunkSize) {
    return [content];
  }

  const chunks: string[] = [];
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  let currentChunk = '';

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (currentChunk.length + trimmedSentence.length + 1 <= maxChunkSize) {
      currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk + '.');
      }
      currentChunk = trimmedSentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk + '.');
  }

  return chunks;
}

// Add data to an index with automatic chunking for large content
export async function addToIndex(indexName: string, data: { title: string; content: string; metadata?: Record<string, any> }) {
  try {
    const index = pc.index(indexName);

    // Chunk the content if it's too large
    const contentChunks = chunkContent(data.content);

    // Split metadata if it's too large
    const metadataChunks = data.metadata ? splitMetadata(data.metadata) : [{}];

    const records = [];

    // Create records for each combination of content and metadata chunks
    for (let i = 0; i < contentChunks.length; i++) {
      for (let j = 0; j < metadataChunks.length; j++) {
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}-${j}`;

        const record: any = {
          _id: id,
          chunk_text: contentChunks[i],
          title: data.title,
          content_chunk_index: i,
          total_content_chunks: contentChunks.length,
          ...metadataChunks[j],
          created_at: new Date().toISOString(),
        };

        // Check if this record would be too large
        const estimatedSize = estimateMetadataSize(record);
        if (estimatedSize > 35000) { // Leave some buffer
          console.warn(`Record ${id} is still too large (${estimatedSize} bytes), further reducing...`);
          // Further reduce the record
          record.chunk_text = record.chunk_text.substring(0, 1000) + '...';
          if (record.summary) {
            record.summary = record.summary.substring(0, 500) + '...';
          }
        }

        records.push(record);
      }
    }

    // Batch upsert records
    const batchSize = 100; // Pinecone batch limit
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await index.upsertRecords(batch);
    }

    return { success: true, id: records[0]._id, totalChunks: records.length };
  } catch (error) {
    console.error('Error adding to index:', error);
    throw new Error(`Failed to add to index: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Specialized function for adding employee data to Pinecone
export async function addEmployeeDataToIndex(indexName: string, data: EmployeeDataInput) {
  try {
    const index = pc.index(indexName);
    const { employeeData, tags = [], source } = data;

    // Create searchable content from employee data
    const searchableContent = createEmployeeSearchableContent(employeeData);

    // Chunk the content if it's too large
    const contentChunks = chunkContent(searchableContent);

    const records = [];

    // Create records for each content chunk
    for (let i = 0; i < contentChunks.length; i++) {
      const id = `${employeeData.employeeId}-${Date.now()}-${i}`;

      const record: any = {
        _id: id,
        chunk_text: contentChunks[i],
        title: `${employeeData.name} - ${employeeData.position}`,
        content_chunk_index: i,
        total_content_chunks: contentChunks.length,

        // Employee-specific metadata
        employeeId: employeeData.employeeId,
        name: employeeData.name,
        organization: employeeData.organization,
        position: employeeData.position,
        reportsTo: employeeData.reportsTo,
        gender: employeeData.gender,
        assessmentDate: employeeData.assessmentDate,
        leadDomain: employeeData.leadDomain,

        // Arrays as comma-separated strings for better searchability
        all34: Array.isArray(employeeData.all34) ? employeeData.all34.join(', ') : employeeData.all34,
        motivators: Array.isArray(employeeData.motivators) ? employeeData.motivators.join(', ') : employeeData.motivators,
        demotivators: Array.isArray(employeeData.demotivators) ? employeeData.demotivators.join(', ') : employeeData.demotivators,

        // Text fields
        bestCollabWith: employeeData.bestCollabWith,
        communicationTips: employeeData.communicationTips,
        howToCoach: employeeData.howToCoach,
        watchouts: employeeData.watchouts,

        // Theme domains as JSON strings
        themeDomains: JSON.stringify(employeeData.themeDomains),
        evidenceQuotes: JSON.stringify(employeeData.evidenceQuotes),

        // Source information
        sourceDocUrl: employeeData.sourceDocUrl,
        sourceProvenance: employeeData.sourceProvenance,

        // Additional metadata
        tags: Array.isArray(tags) ? tags.join(', ') : tags,
        source: source,
        created_at: new Date().toISOString(),
        data_type: 'employee_profile'
      };

      // Check if this record would be too large
      const estimatedSize = estimateMetadataSize(record);
      if (estimatedSize > 35000) { // Leave some buffer
        console.warn(`Record ${id} is still too large (${estimatedSize} bytes), further reducing...`);
        // Further reduce the record
        record.chunk_text = record.chunk_text.substring(0, 1000) + '...';
        if (record.bestCollabWith) {
          record.bestCollabWith = record.bestCollabWith.substring(0, 500) + '...';
        }
      }

      records.push(record);
    }

    // Batch upsert records
    const batchSize = 100; // Pinecone batch limit
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await index.upsertRecords(batch);
    }

    return { success: true, id: records[0]._id, totalChunks: records.length };
  } catch (error) {
    console.error('Error adding employee data to index:', error);
    throw new Error(`Failed to add employee data to index: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Specialized function for adding transcript data to Pinecone
export async function addTranscriptDataToIndex(indexName: string, data: TranscriptDataInput) {
  try {
    const index = pc.index(indexName);
    const { transcriptData, tags = [], source } = data;

    const searchableContent = createTranscriptSearchableContent(transcriptData);
    const contentChunks = chunkContent(searchableContent);
    const records: any[] = [];

    for (let i = 0; i < contentChunks.length; i++) {
      const id = `${transcriptData.date || 'unknown-date'}-${Date.now()}-${i}`;
      const record: any = {
        _id: id,
        chunk_text: contentChunks[i],
        title: `${transcriptData.title || 'Transcript'}${transcriptData.date ? ' - ' + transcriptData.date : ''}`,
        content_chunk_index: i,
        total_content_chunks: contentChunks.length,

        meetingType: transcriptData.meetingType,
        duration: transcriptData.duration,
        participants: Array.isArray(transcriptData.participants) ? transcriptData.participants.join(', ') : transcriptData.participants,
        location: transcriptData.location,
        department: transcriptData.department,
        confidentialityLevel: transcriptData.confidentialityLevel,
        action_items: Array.isArray(transcriptData.action_items) ? transcriptData.action_items.join(', ') : transcriptData.action_items,
        concepts_discussed: Array.isArray(transcriptData.concepts_discussed) ? transcriptData.concepts_discussed.join(', ') : transcriptData.concepts_discussed,
        date: transcriptData.date,
        key_topics: Array.isArray(transcriptData.key_topics) ? transcriptData.key_topics.join(', ') : transcriptData.key_topics,
        summary: transcriptData.summary,

        tags: Array.isArray(tags) ? tags.join(', ') : tags,
        source: source,
        created_at: new Date().toISOString(),
        data_type: 'transcript'
      };

      const estimatedSize = estimateMetadataSize(record);
      if (estimatedSize > 35000) {
        console.warn(`Transcript record ${id} is too large (${estimatedSize} bytes), reducing...`);
        record.chunk_text = record.chunk_text.substring(0, 1000) + '...';
        if (record.summary && typeof record.summary === 'string') {
          record.summary = record.summary.substring(0, 500) + '...';
        }
      }

      records.push(record);
    }

    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await index.upsertRecords(batch);
    }

    return { success: true, id: records[0]._id, totalChunks: records.length };
  } catch (error) {
    console.error('Error adding transcript data to index:', error);
    throw new Error(`Failed to add transcript data to index: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to create searchable content from employee data
function createEmployeeSearchableContent(employeeData: EmployeeData): string {
  const strengths = Array.isArray(employeeData.all34) ? employeeData.all34.join(', ') : employeeData.all34;
  const motivators = Array.isArray(employeeData.motivators) ? employeeData.motivators.join(', ') : employeeData.motivators;
  const demotivators = Array.isArray(employeeData.demotivators) ? employeeData.demotivators.join(', ') : employeeData.demotivators;

  return `Employee Profile: ${employeeData.name}
Position: ${employeeData.position}
Organization: ${employeeData.organization}
Reports To: ${employeeData.reportsTo}
Lead Domain: ${employeeData.leadDomain}
Assessment Date: ${employeeData.assessmentDate}

Strengths: ${strengths}

Best Collaboration: ${employeeData.bestCollabWith}

Communication Tips: ${employeeData.communicationTips}

How to Coach: ${employeeData.howToCoach}

Motivators: ${motivators}

Demotivators: ${demotivators}

Watchouts: ${employeeData.watchouts}

Theme Domains: ${JSON.stringify(employeeData.themeDomains)}

Evidence Quotes: ${JSON.stringify(employeeData.evidenceQuotes)}`;
}

function createTranscriptSearchableContent(transcriptData: import('../types/metadata').TranscriptMetadata): string {
  const participants = Array.isArray(transcriptData.participants) ? transcriptData.participants.join(', ') : transcriptData.participants;
  const actionItems = Array.isArray(transcriptData.action_items) ? transcriptData.action_items.join('; ') : transcriptData.action_items;
  const conceptsDiscussed = Array.isArray(transcriptData.concepts_discussed) ? transcriptData.concepts_discussed.join('; ') : transcriptData.concepts_discussed;
  const keyTopics = Array.isArray(transcriptData.key_topics) ? transcriptData.key_topics.join('; ') : transcriptData.key_topics;

  return `Transcript Summary
Meeting Type: ${transcriptData.meetingType || 'N/A'}
Date: ${transcriptData.date || 'N/A'}
Duration: ${typeof transcriptData.duration === 'number' ? `${transcriptData.duration} min` : 'N/A'}
Participants: ${participants || 'N/A'}
Location: ${transcriptData.location || 'N/A'}
Department: ${transcriptData.department || 'N/A'}
Confidentiality: ${transcriptData.confidentialityLevel || 'N/A'}

Key Topics: ${keyTopics || 'N/A'}
Concepts Discussed: ${conceptsDiscussed || 'N/A'}
Action Items: ${actionItems || 'N/A'}

Summary: ${transcriptData.summary || 'N/A'}`;
}

// List existing indexes
export async function listIndexesFromPinecone() {
  try {
    const indexes = await pc.listIndexes();
    return indexes;
  } catch (error) {
    console.error('Error listing indexes:', error);
    throw new Error(`Failed to list indexes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}


// Semantic search using query text on an index with integrated embeddings
export async function semanticSearch(
  indexName: string,
  params: { query: string; topK?: number; namespace?: string; fields?: string[] }
) {
  try {

    const index = pc.index(indexName);
    const targetNamespace = (params.namespace && params.namespace.length > 0)
      ? params.namespace
      : '__default__';
    const namespace = index.namespace(targetNamespace);

    const response = await namespace.searchRecords({
      query: {
        topK: params.topK ?? 5,
        inputs: { text: params.query },
      },
      // If fields are not specified, Pinecone returns all fields
      fields: params.fields && params.fields.length > 0 ? params.fields : undefined,
    });

    return response;
  } catch (error) {
    console.error('Error performing semantic search:', error);
    throw new Error(`Failed to perform semantic search: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

