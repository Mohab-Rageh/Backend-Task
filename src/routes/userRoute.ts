import { loginUser, registerUser } from "../controllers/userController";
import express from "express";
const router = express.Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request
 */
router.post("/register", registerUser);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates the user and provides a token if credentials are correct.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token
 *       401:
 *         description: Unauthorized
 */
router.post("/login", loginUser);

export default router;
