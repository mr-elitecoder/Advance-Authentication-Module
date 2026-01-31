import connectDB from "./connection.js";

const userSchema = async () => {
  const db = await connectDB();
  db.run(`
            CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
};

export { userSchema };
