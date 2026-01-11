import { db } from '@/lib/db';
import { videos, channels } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';

export const revalidate = 300;
export const fetchCache = 'force-cache';

async function getVideos() {
  const result = await db
    .select({
      id: videos.id,
      youtubeId: videos.youtubeId,
      title: videos.title,
      description: videos.description,
      imageUrl: videos.imageUrl,
      link: videos.link,
      publishedAt: videos.publishedAt,
      createdAt: videos.createdAt,
      channel: {
        id: channels.id,
        youtubeId: channels.youtubeId,
        title: channels.title,
      },
    })
    .from(videos)
    .leftJoin(channels, eq(videos.channelId, channels.id))
    .orderBy(desc(videos.publishedAt))
    .limit(50);

  return result;
}

export default async function Youtube() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">YouTube Dashboard</h1>
          <p className="text-gray-600">{videos.length} videos in database</p>
        </div>

        {videos.length === 0 ? (
          <div className="rounded-lg bg-gray-50 py-12 text-center">
            <p className="mb-4 text-gray-500">No videos found in database</p>
            <p className="text-sm text-gray-400">
              Use the API to ingest YouTube data: POST /api/ingest/youtube
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={video.imageUrl}
                    alt={video.title}
                    className="h-48 w-full object-cover"
                  />
                </a>
                <div className="p-4">
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {video.title}
                    </a>
                  </h3>
                  {video.channel && (
                    <p className="mb-2 text-sm text-gray-600">{video.channel.title}</p>
                  )}
                  {video.description && (
                    <p className="line-clamp-3 text-sm text-gray-500">{video.description}</p>
                  )}
                  {video.publishedAt && (
                    <p className="mt-3 text-xs text-gray-400">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
