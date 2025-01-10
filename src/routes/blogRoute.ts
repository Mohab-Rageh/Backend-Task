import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
} from "../controllers/blogController";
import { authGuard } from "../middlewares/auth";

const router = express.Router();

router.get("/", authGuard("read_blog"), getBlogs);
router.post("/", authGuard("create_blog"), createBlog);
router.put("/:id", authGuard("update_blog"), updateBlog);
router.delete("/:id", authGuard("delete_blog"), deleteBlog);

export default router;
