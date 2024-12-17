/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *         user:
 *           $ref: '#/components/schemas/User'
 */

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    uid: string;
    email: string;
    name?: string;
  };
}
