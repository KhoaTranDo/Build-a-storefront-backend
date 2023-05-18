// @ts-ignore
import Client from "../../database_config"

type Product = {
    id: number,
    price: number,
    name: string
}

export class ProductModel {
    async index(): Promise<Product[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "products"'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get user. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "products" WHERE id=($01)'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user. Error: ${err}`)
        }
    }

    async create(name: string,price: number): Promise<Product> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO "products"(name,price) VALUES($1,$2) RETURNING *'
            const result = await conn.query(sql,[name,price])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`)
        }
    }
}