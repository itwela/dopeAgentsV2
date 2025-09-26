import { NextRequest, NextResponse } from 'next/server';
import { createIndex } from 'apps/web/src/services/pineconeService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { indexName } = body;

    if (!indexName) {
      return NextResponse.json(
        { error: 'Index name is required' },
        { status: 400 }
      );
    }

    await createIndex(indexName);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Index created successfully',
      indexName 
    });
  } catch (error) {
    console.error('Error creating index:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create index' },
      { status: 500 }
    );
  }
}
