'use server';

import { ingestYouTubeData } from '@/lib/jobs/youtube';
import { revalidateTag } from 'next/cache';

interface IngestActionInput {
  channelId?: string;
  query?: string;
  maxResults?: number;
}

interface IngestActionResult {
  success?: boolean;
  results?: {
    channelsCreated: number;
    channelsUpdated: number;
    videosCreated: number;
    videosUpdated: number;
  };
  error?: string;
  message?: string;
}

export async function ingestAction(
  input: IngestActionInput
): Promise<IngestActionResult> {
  try {
    const results = await ingestYouTubeData({
      channelId: input.channelId,
      query: input.query,
      maxResults: input.maxResults,
    });

    // Invalidate cache for videos
    revalidateTag('videos');

    return {
      success: true,
      results,
    };
  } catch (error) {
    console.error('Ingestion error:', error);
    return {
      error: 'Ingestion failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
