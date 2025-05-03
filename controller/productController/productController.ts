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
const filterProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId, color, size, price } = req.query;
        if (!categoryId && !color && !size && !price) {
            const products = await prisma.product.findMany();
            res.status(200).send(products);
            return;
        } else {
            const filter: any = {};
            if (categoryId) filter.subSubCategoryId = categoryId;
            if (price) {
                const [minPrice, maxPrice] = (price as string).split("-");
                filter.price = {
                    gte: minPrice,
                    lte: maxPrice
                };
            }
            if (color) {
                const colorArray = Array.isArray(color) ? color : [color];
                filter.color = {
                    hasSome: colorArray,
                };
            }
            if (size) {
                const sizeArray = Array.isArray(size) ? size : [size];
                filter.size = {
                    hasSome: sizeArray,
                };
            }
            const products = await prisma.product.findMany({
                where: filter,
            });
            res.status(200).json(products);
        }
    } catch (error) {
        next(error);
    }
};

const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const products = await prisma.product.findMany({
            where: {
                subSubCategory: {
                    id: categoryId
                },
                OR: [
                    {
                        subCategory: {
                            id: categoryId
                        }
                    },
                    {
                        subSubCategory: {
                            id: categoryId
                        }
                    }
                ]
            }
        });
        res.status(200).send(products);
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error while fetching products", error });
    }
}
const getNewArrivals = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                stock: {
                    gte: 10
                }
            },
            orderBy: {
                createdAt: 'desc' // newest first
            },
            take: 10 // limit to 10 products
        });
        res.status(200).send(products);
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error while fetching products", error });
    }
}
const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, description, image, categoryId, stock, color, size } = req.body;
        if (image) {
            const base64Image = image
            const buffer = Buffer.from(base64Image, "base64");
            fs.writeFileSync("outputfile", buffer);
            const result = await uploadOnCloudinary(base64Image);
            console.log(result?.secure_url);
            if (result?.secure_url) {
                const data = {
                    name,
                    price,
                    imageUrl: result.secure_url,
                    description,
                    subSubCategoryId: categoryId,
                    stock,
                    color,
                    size,
                }
                const product = await prisma.product.create({
                    data,
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
                subSubCategoryId: categoryId,
                stock,
                color,
                size,
            },
        });
        res.status(201).send(product);
    } catch (error) {
        next(error)
    }
};
export { getAllProducts, getProductByCategory, createProduct, getNewArrivals, filterProduct };