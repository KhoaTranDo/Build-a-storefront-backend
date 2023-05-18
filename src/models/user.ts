// @ts-ignore
import Client from "../../database_config"
import dotenv from 'dotenv'
import bcrypt from "bcrypt"
dotenv.config()

const { SALT, BCRYPT_PASSWORD } = process.env

type User = {
    id: number,
    firstname: string,
    lastname: string,
    password: string
}

export class UserModel {
    async index(): Promise<User[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "users"'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get user. Error: ${err}`)
        }
    }
    async show(id: string): Promise<User> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "users" WHERE id=($1)'
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user. Error: ${err}`)
        }
    }
    async login(firstname: string,lastname: string): Promise<User> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM "users" WHERE firstname=($1) and lastname=($2)'
            const result = await conn.query(sql,[firstname,lastname])

            conn.release()

            return result.rows[0]
        } catch (err) { 
            throw new Error(`Could not find user. Error: ${err}`)
        }
    }

    async create(firstname: string,lastname: string, password: string): Promise<User> {
        try {
            const hashPassword = bcrypt.hashSync(password + BCRYPT_PASSWORD, parseInt(SALT as string))

            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO "users"(firstname,lastname,password)VALUES($1,$2,$3) RETURNING *'
            const result = await conn.query(sql,[firstname,lastname,hashPassword])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'DELETE FROM "users" WHERE id = $1'
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`)
        }
    }
}