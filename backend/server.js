import express from "express";
import cors from "cors";
import { userSchema } from "./database/schema.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/error.js";

const server = express();

server.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  }),
);
server.use(express.json());

await userSchema();

server.use("/api/auth", authRoutes);
server.use(errorHandler);

const PORT = 5000;

server.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
