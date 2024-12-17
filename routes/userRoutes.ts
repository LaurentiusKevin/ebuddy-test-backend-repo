import { Router } from "express";
import { userController } from "../controller/api";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * /fetch-user-data:
 *   get:
 *     summary: Retrieve a list of users
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get("/fetch-user-data", authenticateUser, userController.getUsers);

/**
 * @swagger
 * /create-user-data:
 *   post:
 *     summary: Create a new user
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.post("/create-user-data", authenticateUser, userController.createUser);

/**
 * @swagger
 * /update-user-data:
 *   put:
 *     summary: Update user data
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/update-user-data", authenticateUser, userController.updateUser);

export default router;
