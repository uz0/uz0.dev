import {
  pgTable,
  uuid,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { channels } from './channels';

export const videos = pgTable('videos', {
  id: uuid('id').defaultRandom().primaryKey(),
  youtubeId: text('youtube_id').notNull().unique(),
  channelId: uuid('channel_id').references(() => channels.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  link: text('link').notNull(),
  publishedAt: timestamp('published_at', {
    withTimezone: true,
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
