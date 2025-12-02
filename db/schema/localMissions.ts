import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const localMissionTable = sqliteTable(
  'localMissions',
  {
    missionId: text().primaryKey(),
    missionTitle: text().notNull(),
    missionContent: text().notNull(),
    missionPriorityId: int().notNull(),
    missionStartTime: text().notNull(),
    missionEndTime: text().notNull(),
    modifyAt: text().notNull(),
    userId: text().default(''),
  },
);
