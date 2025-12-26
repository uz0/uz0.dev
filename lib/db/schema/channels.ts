import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const channels = pgTable('channels', {
  id: uuid('id').defaultRandom().primaryKey(),
  youtubeId: text('youtube_id').notNull().unique(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
