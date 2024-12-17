/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: User email
 *         name:
 *           type: string
 *           description: User name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of user creation
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - email
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         name:
 *           type: string
 *           description: User name
 *         password:
 *           type: string
 *           description: User password
 *     UpdateUserDto:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: User email
 *         email:
 *           type: string
 *           description: User email
 *         name:
 *           type: string
 *           description: User name
 *         password:
 *           type: string
 *           description: User password
 */

export interface User {
  id?: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserDto {
  id: string;
  email?: string;
  password?: string;
  name?: string;
}
