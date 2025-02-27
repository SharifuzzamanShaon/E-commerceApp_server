import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const register = async (req: Request, res: Response, next:NextFunction) => {
    try {
        console.log(req.body);
        
        const { name, email, password }:{name:string, email:string, password:number} = req.body;
        if (!name || !email) {
            throw new Error("Email and password are required");
        }

        // const user = await prisma.user.create({ data: { name, email, password} });
        const user = new Object(  {
            name: name,
            email: email,
            password: password,
            done:true
        }  );
        res.status(201).send({ user });
    }
    catch (error) {
        next(error)
    }
}

export { register }