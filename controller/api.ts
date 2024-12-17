import { Request, Response } from "express";
import { userRepository } from "../repository/userCollection";
import { CreateUserDto, UpdateUserDto, User } from "../entities/user";

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const user = await userRepository.create(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: UpdateUserDto = req.body;

      const params: Partial<User> = {};

      if (userData.name) {
        params.name = userData.name;
      }

      if (userData.email) {
        params.email = userData.email;
      }

      const user = await userRepository.update(userData.id, {
        name: userData.name,
        email: userData.email,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userRepository.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userRepository.findById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }
}

export const userController = new UserController();
