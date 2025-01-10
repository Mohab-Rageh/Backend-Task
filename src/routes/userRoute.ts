import { loginUser, registerUser } from "../controllers/userController";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user by providing the name, email, optional phone, role ID, and password. Returns a success message upon successful registration.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: The name of the user (must be at least 3 characters long).
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *                 description: The email address of the user (must be a valid email format).
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: The phone number of the user (optional).
 *               roleId:
 *                 type: integer
 *                 example: 2
 *                 description: The role ID of the user (optional, non-negative number).
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: The password for the new user (must be at least 6 characters long).
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully."
 *       400:
 *         description: Bad request. The provided data is invalid.
 *       409:
 *         description: Conflict. The email is already registered.
 *       500:
 *         description: Internal server error.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Logs the user in by providing their email and password. Returns an authentication token upon successful login.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *                 description: The email address of the user (must be a valid email format).
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: The password for the user (must be at least 6 characters long).
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User successfully logged in and returns an authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNjc2NzY1NywiZXhwIjoxNjI2NzY3NjYwfQ.SQl2ZX_qVfAlTFEog1XxtMZiyrTxVSHlD6V9gkB0fJk"
 *                   description: The JWT authentication token returned after successful login.
 *                 message:
 *                   type: string
 *                   example: "Login successful."
 *       400:
 *         description: Bad request. The provided data is invalid (e.g., missing required fields, invalid formats).
 *       401:
 *         description: Unauthorized. Incorrect email or password.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginUser);

export default router;
