import { Router } from "express";
import register from "./authRouter/authRouter";
const router = Router();

router.use("/auth", register)

export default router;