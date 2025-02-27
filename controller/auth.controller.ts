import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import error from "../utils/error";
import assignToken from "../utils/jwt";
import { valid } from "joi";

const prisma = new PrismaClient();

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log(req.body);
        const isUserExist: {} | null = await prisma.user.findFirst({ where: { email: req.body.email } });
        if (isUserExist) {
            throw error(400, "User already exist");
        }
        const { name, email, password }: { name: string, email: string, password: string } = req.body;
        const user = await prisma.user.create({ data: { name, email, password } });
        res.status(201).send({ user });
    }
    catch (error) {
        next(error)
    }

}
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw error(400, "User not found");
        }
        if (user.password !== password) {
            throw error(400, "Invalid password");
        }
        const payload = { id: user.id, email: user.email }
        assignToken(payload, res)
        res.status(200).send({ user });
    }
    catch (error) {
        next(error)
    }
}
import jwt, { JwtPayload } from "jsonwebtoken";
import { send } from "process";

const updateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken: string = req.cookies.refresh_token;
        if (!refreshToken) {
            throw error(400, "Refresh token not found");
        }
        const validRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY as string) as JwtPayload;
        const  {email}  = validRefreshToken;
        if (!validRefreshToken) {
            throw error(400, "Invalid refresh token");
        }
        console.log(validRefreshToken);
        const validUser = await prisma.user.findFirst({ where: { email } });
        if (!validUser) {
            throw error(400, "User not found");
        }
        const payload = { id: validUser.id, email: validUser.email }
        assignToken(payload, res);
        res.status(200).send({ message: "Token updated successfully" });
    }
    catch (error) {
        next(error)
    }
}

export { register, login, updateToken };