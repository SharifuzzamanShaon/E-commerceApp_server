import { Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();
const assignToken=(userInfo:object, res:Response)=>{
    console.log(process.env.ACCESS_TOKEN_SECRET_KEY);
    
    const accessToken =  jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET_KEY as string, { expiresIn: '2m' });
    const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET_KEY as string, {expiresIn: '2m'});
    const accessTokenOption:object = {
        expires: new Date(Date.now() + 5 * 60 * 1000),
        maxAge: 10  * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      const refreshTokenOption:object = {
        expires: new Date(Date.now() + 10 * 60 * 1000),
        maxAge: 10  * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("access_token", accessToken, accessTokenOption);
      res.cookie("refresh_token", refreshToken, refreshTokenOption);
}
export default assignToken;