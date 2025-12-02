import { MissionType } from '@/types';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const localOrderTable = sqliteTable('localOrders', {
  id: text().primaryKey().notNull(),
  parent: text().notNull(),
  num: int().notNull(),
  deleted: int({ mode: 'boolean' }).default(false),
  itemType: text('itemType', { enum: ['NOT_DONE', 'DONE'] })
    .default(MissionType.NOT_DONE)
    .$type<MissionType>(),
  userId: text().default("")
});
