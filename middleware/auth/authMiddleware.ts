import { NextFunction, Request, Response } from "express";
import error from "../../utils/error";
import jwt from "jsonwebtoken";
import { access } from "fs";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw error(401, "Unauthorized");
        }
        token = token.split(" ")[1];
        const isValidAccessToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string);
        if (!isValidAccessToken) {
            console.log(isValidAccessToken);
            throw error(401, "Unauthorized");
        }
        next();
    } catch (error: any) {
        if (error.expiredAt) {
            res.status(401).send({ expired: true, message: "jwt expired" });
        } else
            next(error);
    }
}
export default authMiddleware;