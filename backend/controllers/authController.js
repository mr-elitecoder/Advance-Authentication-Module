import { authenticateUser, registerUser } from "../services/authService.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || password != confirmPassword)
      return res.status(400).json({ message: "Invalid input" });

    await registerUser({ name, email, password });

    res.status(201).json({ message: "Account Created" });
  } catch (error) {
    if (error.message === "USER_EXISTS")
      return res.status(409).json({ message: "Email Already REgistered" });
    return next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Fill complete details dear" });
    }
    const user = await authenticateUser(email, password);

    res.status(200).json({ message: "Login Successful", user });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res
        .status(401)
        .json({ message: "Invalid Email or Password Dear" });
    }

    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export { register, login };
