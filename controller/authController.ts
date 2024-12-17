import { Request, Response } from "express";
import { auth, firebaseAuth } from "../config/firebaseConfig";
import { LoginDto } from "../entities/auth";
import { userRepository } from "../repository/userCollection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { refreshToken } from "node_modules/firebase-admin/lib/app";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      const newUser = await userRepository.create({
        email,
        password,
        name,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: LoginDto = req.body;

      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      const { user } = userCredential;

      if (!user) {
        res.status(401).json({ error: "Authentication failed" });
        return;
      }

      // Get user data from Firestore
      const userData = await userRepository.findByEmail(email);

      res.status(200).json({
        accessToken: await user.getIdToken(),
        refreshToken: user.refreshToken,
        user: {
          uid: user.uid,
          email: user.email,
          name: userData?.name,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({ error: "Invalid credentials" });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {}
}

export const authController = new AuthController();
