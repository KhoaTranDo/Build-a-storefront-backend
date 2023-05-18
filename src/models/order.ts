// @ts-ignore
import Client from "../../database_config"

type Order = {
    id: number,
    user_id: string,
    product_id: string,
    quantity: number,
    status: string
}

export class OrderModel {
    async index(): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "products" p INNER JOIN "orders" o ON p.id = o.product_id INNER JOIN "users" u ON u.id = o.user_id '

            const result = await conn.query(sql)

            conn.release()
            delete result.rows[0].password
            return result.rows
        } catch (err) {
            throw new Error(`Could not get order. Error: ${err}`)
        }
    }

    async show(user_id: string): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "products" p INNER JOIN "orders" o ON p.id = o.product_id INNER JOIN "users" u ON u.id = o.user_id WHERE o.user_id = ($1)'
            const result = await conn.query(sql,[user_id])

            conn.release()
            delete result.rows[0].password
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order. Error: ${err}`)
        }
    }

    async create(user_id: string,product_id: string, quantity: number, status: string): Promise<Order> {
        try {
            let status_bool
            if(status = 'active')
                status_bool = 0
            if(status = 'complete')
                status_bool = 1
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO "orders"(user_id,product_id,quantity,status) VALUES($1,$2,$3,$4) RETURNING *'
            const result = await conn.query(sql,[user_id,product_id,quantity,status_bool])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }
}