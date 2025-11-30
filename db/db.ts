import * as SQLite from "expo-sqlite"

export let db: SQLite.SQLiteDatabase

export async function initdb() {
  db = await SQLite.openDatabaseAsync('develop');
}