import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "database.sqlite");

let db = null;
const connectDB = async () => {
  if (db) return db;

  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.exec("PRAGMA foreign_keys = ON");
    await db.exec("PRAGMA journal_mode = WAL");

    console.log(`SQlite initialized at ${dbPath}`);
    return db;
  } catch (error) {
    console.log(`Database Initailization Failed : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
