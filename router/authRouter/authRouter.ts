import { Router } from "express";
import { login, register, updateToken } from "../../controller/auth.controller";
import { runValidation } from "../../middleware/validation";
import { schema } from "../../middleware/validation/schema";
import authMiddleware from "../../middleware/auth/authMiddleware";

const router = Router();

router.post("/register", runValidation(schema.register), register)
router.post("/login", runValidation(schema.login), login)
router.get("/update-token", updateToken)
router.get("/protected", authMiddleware, (req, res, next) => {
    res.status(200).send({ message: "Protected route" })
})
export default router;