import { findUserByEmail, insertUser } from "../repos/userRepo.js";
import { hashPassword, comparePassword } from "../utils/password.js";

const registerUser = async ({ username, userEmail, password }) => {
  const name = username;
  const email = userEmail;
  const exist = await findUserByEmail(email);

  if (exist) throw new Error("USER_EXISTS");

  const passwordHash = await hashPassword(password);

  await insertUser({ name, email, passwordHash });
};

const authenticateUser = async (userEmail, password) => {
  const email = userEmail;
  const user = await findUserByEmail(email);
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const isValid = await comparePassword(password, user.password_hash);

  if (!isValid) throw new Error("INVALID_CREDENTIALS");
  return user;
};

export { registerUser, authenticateUser };
