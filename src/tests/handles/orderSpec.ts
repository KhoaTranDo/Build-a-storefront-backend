import app from "../../server"
import report from "supertest"
import { ProductModel } from "../../models/product";
import { UserModel } from "../../models/user";
import { OrderModel } from "../../models/order";

describe("Test endpoint order", () => {

    const order = new OrderModel
    const user = new UserModel()
    const product = new ProductModel()
    const orderTest = {
        "quantity": 2,
        "status": "active"
    }
    const userTest = {
        "id": 1,
        "firstname": "user3",
        "lastname": "user3",
        "password": "1234"
    }
    const productTest = {
        "id": 1,
        "name": "product01",
        "price": 1000
    }
    let token: string, user_id: string, product_id: string

    beforeAll(async () => {
        const result = await user.create(userTest.firstname, userTest.lastname, userTest.password)
        user_id = result.id.toString()
        await report(app).post(`/user/get-token`).send({
            "firstname": userTest.firstname,
            "lastname": userTest.lastname,
            "password": userTest.password
        })
            .then(response => {
                token = response.body.Token
            }).catch((err) => {
                console.log(err)
            })
        product_id = (await product.create(productTest.name, productTest.price)).id.toString()
        await order.create(user_id, product_id, orderTest.quantity, orderTest.status)
    })
    it('test no token authorized endpoint [GET] /order', async () => {
        const result = await report(app).get(`/order/`)
        expect(result.statusCode).toEqual(401)
        expect(result.text).toEqual('"Invalid token JsonWebTokenError: jwt must be provided"')
    });

    it('test no token authorized endpoint [GET] /order/:user_id', async () => {
        const result = await report(app).get(`/order/${user_id}`)
        expect(result.statusCode).toEqual(401)
        expect(result.text).toEqual('"Invalid token JsonWebTokenError: jwt must be provided"')
    });

    it('test no token authorized endpoint [POST] /order/create', async () => {
        const result = await report(app).get(`/order/create`)
        expect(result.statusCode).toEqual(401)
        expect(result.text).toEqual('"Invalid token JsonWebTokenError: jwt must be provided"')
    });

    it('test endpoint [GET] /order', async () => {
        const result = await report(app).get(`/order/`).set('Authorization', `Bearer ${token}`)
        expect(result.statusCode).toEqual(200)
    });

    it('test endpoint [GET] /order/:user_id', async () => {
        const result = await report(app).get(`/order/${user_id}`).set('Authorization', `Bearer ${token}`)
        expect(result.statusCode).toEqual(200)
    });

    it('test endpoint [POST] /order', async () => {
        const result = await report(app).post(`/order`).set('Authorization', `Bearer ${token}`)
        .send({
            'product_id': product_id,
            'user_id': user_id,
            'quantity':orderTest.quantity,
            'status':orderTest.status

        })
        expect(result.body.product_id).toEqual(product_id)
        expect(result.body.user_id).toEqual(user_id)
    });

})