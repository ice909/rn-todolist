import * as SQLite from "expo-sqlite"
import { drizzle } from 'drizzle-orm/expo-sqlite';

export const expoSqlite = SQLite.openDatabaseSync('develop.db');
export const db = drizzle(expoSqlite);