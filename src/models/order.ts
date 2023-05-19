// @ts-ignore
import Client from "../../database_config"

type Order = {
    id: number,
    user_id: string,
    status: string
}

type productOrder = {
    id: number,
    product_id: string,
    quantity: number,
    order_id: string
}

export class OrderModel {
    async index(): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "orders"'

            const result = await conn.query(sql)

            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get order. Error: ${err}`)
        }
    }

    async show(user_id: string): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "orders" WHERE user_id = ($1)'
            const result = await conn.query(sql,[user_id])

            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not find order. Error: ${err}`)
        }
    }

    async create(user_id: string, status: string): Promise<Order> {
        try {
            let status_bool
            if(status == 'active')
                status_bool = true
            if(status == 'complete')
                status_bool = false
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO "orders"(user_id,status) VALUES($1,$2) RETURNING *'
            const result = await conn.query(sql,[user_id,status_bool])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async createProductOrder(product_id: string, quantity: number, order_id: string): Promise<productOrder> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO "product_order"(product_id,quantity,order_id) VALUES($1,$2,$3) RETURNING *'
            const result = await conn.query(sql,[product_id,quantity,order_id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async productOrderDetail(order_id: string): Promise<productOrder> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "product_order" WHERE order_id = $1'
            const result = await conn.query(sql,[order_id])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get order detail. Error: ${err}`)
        }
    }
}