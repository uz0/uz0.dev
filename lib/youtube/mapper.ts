import type {
  YouTubeVideoResponse,
  YouTubeChannelResponse,
} from './client';

export interface Channel {
  youtubeId: string;
  title: string;
}

export interface Video {
  youtubeId: string;
  channelId: string;
  channelTitle: string;
  title: string;
  description: string | null;
  imageUrl: string;
  link: string;
  publishedAt: Date | null;
}

/**
 * Maps YouTube API channel response to domain model
 */
export function mapChannel(response: YouTubeChannelResponse): Channel {
  return {
    youtubeId: response.id,
    title: response.snippet.title,
  };
}

/**
 * Maps YouTube API video response to domain model
 */
export function mapVideo(response: YouTubeVideoResponse): Video {
  const { id, snippet } = response;

  // Get best available thumbnail
  const thumbnail =
    snippet.thumbnails.maxres?.url ||
    snippet.thumbnails.standard?.url ||
    snippet.thumbnails.high?.url ||
    snippet.thumbnails.medium?.url ||
    snippet.thumbnails.default?.url ||
    '';

  return {
    youtubeId: id,
    channelId: snippet.channelId,
    channelTitle: snippet.channelTitle,
    title: snippet.title,
    description: snippet.description || null,
    imageUrl: thumbnail,
    link: `https://www.youtube.com/watch?v=${id}`,
    publishedAt: snippet.publishedAt ? new Date(snippet.publishedAt) : null,
  };
}
