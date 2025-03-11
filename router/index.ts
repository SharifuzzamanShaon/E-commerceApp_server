import { Router } from "express";
import register from "./authRouter/authRouter";
import productRouter from "./productRouter/productRouter";
const router = Router();

router.use("/auth", register)
router.use("/product", productRouter)
export default router;