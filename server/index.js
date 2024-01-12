import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRouter from "./routes/todo.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server started successfully on port 3000!");
});

app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);
