import express from "express";
import {
  getUserInfo,
  login,
  register,
} from "../controllers/user.controller.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", checkAuth, getUserInfo);
router.post("profile/:id");

export default router;
