import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { getApiKey } from '../../../../services/pineconeService';


// Create a new Pinecone instance
const pc = new Pinecone({
  apiKey: getApiKey()
});

export async function GET() {
  try {

    // List existing indexes
    const indexes = await pc.listIndexes();
    
    return NextResponse.json({ 
      success: true, 
      indexes: indexes.indexes || []
    });
  } catch (error) {
    console.error('Error listing indexes:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list indexes' },
      { status: 500 }
    );
  }
}

