import { NextFunction, Request, Response } from "express"
import { Schema } from "joi"

export const runValidation = (schema:Schema) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false, errors: { wrap: { label: "" } } })

        if (error) {
            const errorList = error.details.map((itme:any) => itme.message)
            res.status(400).json({ message: "Invalid input", error: errorList })
            return 
        }
        next()
    }
}