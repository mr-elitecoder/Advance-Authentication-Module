import connectDB from "../database/connection.js";

const findUserByEmail = async (email) => {
  const db = await connectDB();

  return db.get(
    `
    SELECT * FROM users
    WHERE  email = ?
  `,
    [email],
  );
  /* SQL Injection Risk
        This directly injects user input into SQL — extremely dangerous.
        A malicious user could log in as someone else with SQL like ' OR 1=1 --
        If you put the user's email directly into the string, a hacker could type a "bad" email like '; DROP TABLE users; to delete your data. This is called SQL Injection.

        Why it's good: You leave the ? alone in the string. You pass the email as a separate piece of data in an array [email].

        How it works: The database receives the command first, sees the ?, and says: "Okay, I'm expecting some text here." Only then does it safely plug in the email.

        The Result: Even if a hacker types a "delete" command, the database just treats it as a very long, weird email address. Nothing breaks.
        db.get('SELECT * FROM users WHERE email = ?', [email]);

        I avoid using template literals (${}) inside SQL queries because it leads to SQL Injection vulnerabilities. Instead, I use Parameterized Queries with the ? placeholder. This ensures that user input is treated strictly as data, not as executable code, making the application much more secure
        */
};

const insertUser = async ({ name, email, passwordHash }) => {
  const db = await connectDB();

  const sql = "INSERT INTO users (name , email , password_hash) VALUES(?,?,?)";

  const params = [name, email, passwordHash];
  console.log(params);
  return db.run(sql, params);

  /* SQL injection Risk 
        I used it previously but Again return db.run(`
        INSERT INTO users(name,email,password_hash)
        VALUES (${(username, email, passwordHash)})
    `);
  
    The Syntax Error (Why it will crash)
    In your code: VALUES (${(username, email, passwordHash)})

    The Problem: Inside the ${}, you are using the JavaScript "comma operator". This doesn't send three values to SQL; it only sends the last one (passwordHash).

    The Result: SQL expects 3 values (name, email, password) but only gets 1. The database will throw an error and stop working.

    2. The Security Error (SQL Injection)
    Even if you fixed the syntax, using ${} puts the text directly into the command.

    The Risk: A hacker could type a command into the "username" box, and your server would run that command. They could delete your entire users table.
    */
};

export { findUserByEmail, insertUser };
