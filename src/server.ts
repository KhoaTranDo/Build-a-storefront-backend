import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"
const UserRouter = require("./handles/user-router");
const ProductRouter = require("./handles/product-router");
const OrderRouter = require("./handles/order-router")

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

const corsOptions = {
    origin: 'http://127.0.0.1:3000',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.use("/user",UserRouter)
app.use("/order",OrderRouter)
app.use("/product",ProductRouter)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app