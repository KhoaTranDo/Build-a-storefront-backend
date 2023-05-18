import express, { Response, Request } from "express";
const router = express.Router()
const verify_token = require("../middleware/verify-token")
const { OrderModel } = require("../models/order")

const orderHandle = new OrderModel
router.get("/",verify_token ,async (req: Request, res: Response) => {
    try {
        const order = await orderHandle.index()
        res.send(order)
    } catch (err) {
        res.status(403).send("get list order failed")
    }
})

router.get("/:user_id",verify_token, async (req: Request, res: Response) => {
    try {        
        const { user_id } = req.params
        const order = await orderHandle.show(user_id)
        res.send(order)
    } catch (err) {
        res.status(403).send("get order failed")
    }
})

router.post("/", verify_token, async (req: Request, res: Response) => {
    try {
        const { user_id, product_id, quantity, status } = req.body
        const order = await orderHandle.create(user_id,product_id , quantity, status)
        res.send(order)
    } catch (err) {
        res.status(403).send("create order failed")
    }
})


module.exports = router
