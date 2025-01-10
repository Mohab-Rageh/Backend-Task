import express from "express";

import { authGuard } from "../middlewares/auth";
import { createBlog } from "src/controllers/blogController";

const router = express.Router();

router.post("/", authGuard(["Admin", "Editor"]), createBlog);

export default router;
