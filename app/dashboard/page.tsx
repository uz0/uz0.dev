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

export default async function DashboardPage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">YouTube Dashboard</h1>
          <p className="text-gray-600">
            {videos.length} videos in database
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No videos found in database</p>
            <p className="text-sm text-gray-400">
              Use the API to ingest YouTube data: POST /api/ingest/youtube
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={video.imageUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                </a>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
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
                    <p className="text-sm text-gray-600 mb-2">
                      {video.channel.title}
                    </p>
                  )}
                  {video.description && (
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {video.description}
                    </p>
                  )}
                  {video.publishedAt && (
                    <p className="text-xs text-gray-400 mt-3">
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
