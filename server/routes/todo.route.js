import express from "express";
import {
  createTodo,
  removeTodo,
  getOneTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/createTodo", checkAuth, createTodo);
router.post("/todos/:id", checkAuth, removeTodo);
router.get("/todos/:id", getOneTodo);
router.get("/todos", getAllTodos);
router.patch("/todos/:id", checkAuth, updateTodo);
router.delete("/todos/:id", checkAuth, deleteTodo);

export default router;
