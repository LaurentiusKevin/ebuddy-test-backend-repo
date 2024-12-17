import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "../config/swagger";

const router = Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(specs));

export default router;
