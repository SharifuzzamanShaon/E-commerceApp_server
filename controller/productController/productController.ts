import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { uploadOnCloudinary } from "../../utils/fileUploader";
import error from "../../utils/error";
const prisma = new PrismaClient();
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).send(products);
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error while fetching products", error });
    }
};
const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, description, image, categoryId, stock } = req.body;
        if (image) {
            const base64Image = image
            const buffer = Buffer.from(base64Image, "base64");
            fs.writeFileSync("outputfile", buffer);
            let result = await uploadOnCloudinary(base64Image);
            console.log(result);
            let imageUrl;
            if (result) {
                imageUrl = result.secure_url;
                const product = await prisma.product.create({
                    data: {
                        name,
                        price,
                        imageUrl:result.secure_url,
                        description,
                        categoryId,
                        stock,
                    },
                });
                res.status(201).send(product);
            } else {
                throw error(404, "Failed to upload image to Cloudinary");
            }
        }
        const product = await prisma.product.create({
            data: {
                name,
                price,
                imageUrl: "",
                description,
                categoryId,
                stock,
            },
        });
        res.status(201).send(product);
    } catch (error) {
        next(error)
    }
};
export { getAllProducts, createProduct };