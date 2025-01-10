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
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Retrieve all blogs
 *     description: Fetches blogs with optional filters such as pagination and tags. Requires a valid token with "read_blog" permission.
 *     security:
 *       - bearerAuth: [] # Assuming you use Bearer tokens for authentication
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: The page number for pagination (optional).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           example: 10
 *         description: The number of items per page (optional, max 100).
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *           example: "technology,health"
 *         description: Filter blogs by tags (comma-separated).
 *     responses:
 *       200:
 *         description: Successfully retrieved blogs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blogs fetched successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "A Blog Title"
 *                       content:
 *                         type: string
 *                         example: "This is the content of the blog."
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "example-tag"
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *       403:
 *         description: Forbidden. User lacks the "read_blog" permission.
 */

router.get("/", authGuard("read_blog"), getBlogs);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     description: Creates a new blog post with the provided title, content, and optional tags. Requires a valid token with "create_blog" permission.
 *     security:
 *       - bearerAuth: [] # Assuming you use Bearer tokens for authentication
 *     tags:
 *       - Blogs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Blog Post"
 *               content:
 *                 type: string
 *                 example: "This is the content of the new blog post."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "tech,health"
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Blog successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog created successfully."
 *                 blog:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "New Blog Post"
 *                     content:
 *                       type: string
 *                       example: "This is the content of the new blog post."
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "tech,health"
 *       400:
 *         description: Bad request. The provided data is invalid.
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *       403:
 *         description: Forbidden. User lacks the "create_blog" permission.
 */

router.post("/", authGuard("create_blog"), createBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update an existing blog
 *     description: Updates the details of an existing blog with the provided ID. The title, content, and tags can be updated. Requires a valid token with "update_blog" permission.
 *     security:
 *       - bearerAuth: [] # Assuming you use Bearer tokens for authentication
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the blog to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Blog Title"
 *               content:
 *                 type: string
 *                 example: "This is the updated content of the blog."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "tech,health"
 *             required:
 *               - title
 *               - content
 *               - tags
 *     responses:
 *       200:
 *         description: Blog successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog updated successfully."
 *                 updatedBlog:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Updated Blog Title"
 *                     content:
 *                       type: string
 *                       example: "This is the updated content of the blog."
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "tech,health"
 *                     author:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *       400:
 *         description: Bad request. The provided data is invalid.
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *       403:
 *         description: Forbidden. User lacks the "update_blog" permission.
 *       404:
 *         description: Blog not found.
 */

router.put("/:id", authGuard("update_blog"), updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     description: Deletes an existing blog by its ID. Requires a valid token with "delete_blog" permission.
 *     security:
 *       - bearerAuth: [] # Assuming you use Bearer tokens for authentication
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the blog to be deleted.
 *     responses:
 *       200:
 *         description: Blog successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog deleted successfully."
 *       400:
 *         description: Bad request. The provided data is invalid.
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *       403:
 *         description: Forbidden. User lacks the "delete_blog" permission.
 *       404:
 *         description: Blog not found.
 */

router.delete("/:id", authGuard("delete_blog"), deleteBlog);

export default router;
