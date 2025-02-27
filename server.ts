import {Express, NextFunction, Request, Response } from "express";
import express from 'express';
const app:Express = express();
import router from "./router";
import bodyParser from "body-parser";
var cookieParser = require('cookie-parser')
require("dotenv").config();
require("dotenv").config();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));



//Test router
app.get('/', (_req:Request, res:Response) => {
    res.status(200).send({message : 'Welcome to the server'});
})


app.use("/api/v1", router);

interface CustomError extends Error {
    statusCode?: number;
    message: string;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).send({ message });
});
const port = process.env.PORT || 5005;

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});