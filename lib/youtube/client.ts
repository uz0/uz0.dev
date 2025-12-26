/**
 * YouTube API Client
 *
 * Responsibilities:
 * - Authentication (API key)
 * - Retry / rate limit handling
 * - Raw requests to YouTube API
 */

const API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideoResponse {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
      standard?: { url: string };
      maxres?: { url: string };
    };
  };
}

export interface YouTubeChannelResponse {
  id: string;
  snippet: {
    title: string;
  };
}

export class YouTubeClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Fetch videos from a channel or search query
   */
  async fetchVideos(params: {
    channelId?: string;
    query?: string;
    maxResults?: number;
  }): Promise<YouTubeVideoResponse[]> {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      key: this.apiKey,
      maxResults: String(params.maxResults || 10),
      type: 'video',
      order: 'date',
    });

    if (params.channelId) {
      searchParams.set('channelId', params.channelId);
    }
    if (params.query) {
      searchParams.set('q', params.query);
    }

    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items || [];
  }

  /**
   * Fetch channel details
   */
  async fetchChannel(channelId: string): Promise<YouTubeChannelResponse | null> {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      key: this.apiKey,
      id: channelId,
    });

    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/channels?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items?.[0] || null;
  }
}

// Singleton instance
export function getYouTubeClient(): YouTubeClient {
  if (!API_KEY) {
    throw new Error('YOUTUBE_API_KEY environment variable is not set');
  }
  return new YouTubeClient(API_KEY);
}
