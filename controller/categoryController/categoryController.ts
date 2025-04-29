import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: {
                name
            }
        })
        res.status(201).send({ message: `${category.name} added successfully` })
    } catch (error) {
        next(error)
    }
}
const addSubcategoy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, parentCategoryId } = req.body;
        const isCategoryExist = await prisma.subCategroy.findUnique({
            where: {
                name,
                parentCategory: parentCategoryId
            }
        })
        const isCategoryExist_l2 = await prisma.subSubCategory.findUnique({
            where: {
                name,
                parentCategory: parentCategoryId
            }
        })
        if (isCategoryExist || isCategoryExist_l2) {
            res.status(400).send({ message: `${name} already exist` })
        } else {
            let category
            try {
                category = await prisma.subCategroy.create({
                    data: {
                        name,
                        parentCategory: parentCategoryId,
                    }
                });
                res.status(201).send({ message: `${category.name} subCategory added successfully` });
            } catch (error) {
                category = await prisma.subSubCategory.create({
                    data: {
                        name,
                        parentCategory: parentCategoryId,
                    }
                });
                res.status(201).send({ message: `${category.name} subSubCategory added successfully` });
            }
        }
    } catch (error) {
        next(error)
    }
}

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                subCategories: {
                    select: {
                        id: true,
                        name: true,
                        SubSubCategory: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).send(categories)
    } catch (error) {
        next(error)
    }
}
export { createCategory, getAllCategories, addSubcategoy }