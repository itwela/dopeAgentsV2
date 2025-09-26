import { NextRequest, NextResponse } from 'next/server';
import { addToIndex } from '../../../services/pineconeService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { indexName, title, content, metadata } = body;

    // Normalize participants to an array if present
    let normalizedMetadata = metadata as Record<string, unknown> | undefined;
    if (normalizedMetadata && typeof normalizedMetadata === 'object') {
      const participants = (normalizedMetadata as any).participants;
      if (participants !== undefined && participants !== null) {
        if (Array.isArray(participants)) {
          // ensure strings and trimmed
          (normalizedMetadata as any).participants = participants
            .map((p) => (typeof p === 'string' ? p.trim() : String(p)))
            .filter((p) => p.length > 0);
        } else if (typeof participants === 'string') {
          (normalizedMetadata as any).participants = participants
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        } else {
          (normalizedMetadata as any).participants = [String(participants)];
        }
      }
    }

    if (!indexName || !title || !content) {
      return NextResponse.json(
        { error: 'Index name, title, and content are required' },
        { status: 400 }
      );
    }

    const result = await addToIndex(indexName, { title, content, metadata: normalizedMetadata });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Data added to knowledgebase successfully',
      id: result.id 
    });
  } catch (error) {
    console.error('Error in knowledgebase API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add to knowledgebase' },
      { status: 500 }
    );
  }
}
