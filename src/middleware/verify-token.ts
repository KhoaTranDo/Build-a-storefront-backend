import express, { Request, Response} from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const verifyToken = (req:Request,res:Response, next: Function)=>{
    const token = req.headers.authorization?.split(' ')[1]
    
    try {
        jwt.verify(token as string, process.env.SECRET_JWT as string)
        next()
    } catch (err) {
        res.status(401).json(`Invalid token ${err}`)
    }
}

module.exports = verifyToken