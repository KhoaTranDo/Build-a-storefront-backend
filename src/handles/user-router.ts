import express, { Response, Request } from "express";
import dotenv, { config } from 'dotenv'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const router = express.Router()
const verify_token = require("../middleware/verify-token")
const { UserModel } = require("../models/user")
dotenv.config()
const {SECRET_JWT, BCRYPT_PASSWORD } = process.env

const userHandle = new UserModel
router.get("/", verify_token, async (req: Request, res: Response) => {
    try {
        const user = await userHandle.index()
        res.send(user)
    } catch (err) {
        res.status(403).send("get list user failed")
    }
})


router.post('/get-token', async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, password } = req.body
        const user = await userHandle.login(firstname, lastname)
        
        const check = bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)
        if (check == true) {
            const TOKEN = jwt.sign({ firstname: firstname, lastname: lastname }, SECRET_JWT as string)
            res.json({ Token: TOKEN })
        }
        else{
            res.status(403).send({ msg: "invalid user" })
        }
        } catch (err) {
                res.status(403).send("get token failed")
    }
})

router.get("/:id", verify_token, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await userHandle.show(id)
        res.send(user)
    } catch (err) {
        res.status(403).send("get user by id failed")
    }
})
router.post("/create", async (req: Request, res: Response) => {
    try{
        const { firstname, lastname, password } = req.body
        const user = await userHandle.create(firstname, lastname, password)
        res.send(user)
    } catch (err) {
        res.status(403).send("create user failed")
    }
})

module.exports = router
