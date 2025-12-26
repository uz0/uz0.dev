/**
 * YouTube Data Ingestion Job
 *
 * Responsibilities:
 * - Periodic collection logic
 * - Call YouTube API
 * - Normalize data using mapper
 * - Save to Postgres (idempotent upserts)
 */

import { db } from '@/lib/db';
import { channels, videos } from '@/lib/db/schema';
import { getYouTubeClient } from '@/lib/youtube/client';
import { mapChannel, mapVideo } from '@/lib/youtube/mapper';
import { eq } from 'drizzle-orm';

export interface IngestOptions {
  channelId?: string;
  query?: string;
  maxResults?: number;
}

/**
 * Main ingestion function - idempotent upserts
 */
export async function ingestYouTubeData(options: IngestOptions = {}) {
  const client = getYouTubeClient();

  try {
    // Fetch videos from YouTube API
    const youTubeVideos = await client.fetchVideos({
      channelId: options.channelId,
      query: options.query,
      maxResults: options.maxResults || 10,
    });

    const results = {
      channelsCreated: 0,
      channelsUpdated: 0,
      videosCreated: 0,
      videosUpdated: 0,
    };

    for (const videoResponse of youTubeVideos) {
      const video = mapVideo(videoResponse);

      // Upsert channel
      const channelResult = await upsertChannel(video.channelId, video.channelTitle);
      if (channelResult === 'created') results.channelsCreated++;
      if (channelResult === 'updated') results.channelsUpdated++;

      // Get channel ID from database for foreign key
      const channelRecord = await db.query.channels.findFirst({
        where: eq(channels.youtubeId, video.channelId),
      });

      if (!channelRecord) {
        console.error(`Channel not found after upsert: ${video.channelId}`);
        continue;
      }

      // Upsert video
      const videoResult = await upsertVideo(video, channelRecord.id);
      if (videoResult === 'created') results.videosCreated++;
      if (videoResult === 'updated') results.videosUpdated++;
    }

    return results;
  } catch (error) {
    console.error('YouTube ingestion error:', error);
    throw error;
  }
}

/**
 * Upsert channel - returns 'created' or 'updated'
 */
async function upsertChannel(youtubeId: string, title: string): Promise<'created' | 'updated'> {
  const existing = await db.query.channels.findFirst({
    where: eq(channels.youtubeId, youtubeId),
  });

  if (existing) {
    await db.update(channels).set({ title }).where(eq(channels.id, existing.id));
    return 'updated';
  } else {
    await db.insert(channels).values({
      youtubeId,
      title,
    });
    return 'created';
  }
}

/**
 * Upsert video - returns 'created' or 'updated'
 */
async function upsertVideo(
  video: ReturnType<typeof mapVideo>,
  channelId: string
): Promise<'created' | 'updated'> {
  const existing = await db.query.videos.findFirst({
    where: eq(videos.youtubeId, video.youtubeId),
  });

  const videoData = {
    youtubeId: video.youtubeId,
    channelId,
    title: video.title,
    description: video.description,
    imageUrl: video.imageUrl,
    link: video.link,
    publishedAt: video.publishedAt,
  };

  if (existing) {
    await db.update(videos).set(videoData).where(eq(videos.id, existing.id));
    return 'updated';
  } else {
    await db.insert(videos).values(videoData);
    return 'created';
  }
}
