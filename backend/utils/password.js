import bcrypt from "bcrypt";

const hashPassword = async (plain) => {
  return bcrypt.hash(plain, 12);
};

const comparePassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};

export { hashPassword, comparePassword };

/* 12 SALT Rounds Mean:
You turn the key 12 times.

For a normal user with the right key, it only takes a fraction of a second longer to open.

For a hacker trying to "break in" by guessing every possible key, they have to turn the lock 12 times for every single guess.*/
