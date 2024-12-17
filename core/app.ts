import express, { Express } from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import { errorHandler } from "../middleware/authMiddleware";
import swaggerRoutes from "../routes/swaggerRoutes";
import authRoutes from "../routes/authRoutes";

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/auth", authRoutes);
    this.app.use("/", userRoutes);
    this.app.use("/api-docs", swaggerRoutes);
    this.app.use(errorHandler);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
      console.log(
        `📚 Swagger documentation available at http://localhost:${port}/api-docs`
      );
    });
  }
}

export default App;
