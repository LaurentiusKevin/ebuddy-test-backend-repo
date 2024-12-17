import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
};
