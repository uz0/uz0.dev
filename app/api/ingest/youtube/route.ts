import { NextRequest, NextResponse } from 'next/server';
import { ingestYouTubeData } from '@/lib/jobs/youtube';
import { revalidateTag } from 'next/cache';

const INGEST_SECRET = process.env.INGEST_SECRET || 'change-me-in-production';

/**
 * POST /api/ingest/youtube
 *
 * Manual trigger for YouTube data ingestion
 * Requires authentication via INGEST_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret token for authentication
    const authHeader = request.headers.get('authorization');
    const secret = authHeader?.replace('Bearer ', '') || '';

    if (secret !== INGEST_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body for options
    const body = await request.json().catch(() => ({}));
    const { channelId, query, maxResults } = body as {
      channelId?: string;
      query?: string;
      maxResults?: number;
    };

    // Run ingestion
    const results = await ingestYouTubeData({
      channelId,
      query,
      maxResults,
    });

    // Invalidate cache for videos
    revalidateTag('videos');

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Ingestion error:', error);
    return NextResponse.json(
      {
        error: 'Ingestion failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
