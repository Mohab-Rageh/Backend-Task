import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
} from "../controllers/blogController";
import { authGuard } from "../middlewares/auth";

const router = express.Router();

/**
 * @openapi
 * /api/blogs:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieves a list of blog posts with optional filtering.
 *     responses:
 *       200:
 *         description: Successfully fetched the list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/", authGuard("read_blog"), getBlogs);

/**
 * @openapi
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     description: Creates a new blog post with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Blog post successfully created
 *       400:
 *         description: Bad request
 */
router.post("/", authGuard("create_blog"), createBlog);

/**
 * @openapi
 * /api/blogs/{id}:
 *   put:
 *     summary: Update an existing blog post
 *     description: Updates the blog post with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Blog post successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Blog post not found
 */
router.put("/:id", authGuard("update_blog"), updateBlog);

/**
 * @openapi
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     description: Deletes the blog post with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog post successfully deleted
 *       404:
 *         description: Blog post not found
 */
router.delete("/:id", authGuard("delete_blog"), deleteBlog);

export default router;
