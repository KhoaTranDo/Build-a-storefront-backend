import express, { Response, Request } from "express";
const router = express.Router()
const verify_token = require("../middleware/verify-token")
const { ProductModel } = require("../models/product")

const productHandle = new ProductModel
router.get("/", async (req: Request, res: Response) => {
    try {
        const product = await productHandle.index()
        res.send(product)
        res.status(404)
    } catch (err) {
        res.status(403).send("get list product failed")
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await productHandle.show(id)
        res.send(product)
    } catch (err) {
        res.status(403).send("get product by id failed")
    }
})

router.post("/create", verify_token, async (req: Request, res: Response) => {
    try {
        const { name, price } = req.body
        const user = await productHandle.create(name, price)
        res.send(user)
    } catch (err) {
        res.status(403).send("create product failed")
    }
})

module.exports = router
