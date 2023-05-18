import app from "../../server"
import report from "supertest"
import { UserModel } from "../../models/user"


describe("Test endpoint product", () => {
    const user = new UserModel()
    const userTest = {
        "id": 1,
        "firstname": "user2",
        "lastname": "user2",
        "password": "1234"
    }
    const productTest = {
        "id": 1,
        "name": "product01",
        "price": 1000
    }

    let token: string, user_id: string

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
    })

    it('test no token authorized endpoint [GET] /product', async () => {
        const result = await report(app).get(`/product/`)
        expect(result.statusCode).toEqual(200)
    });

    it('test no token authorized endpoint [GET] /product/:id', async () => {
        const result = await report(app).get(`/product/${productTest.id}`)
        expect(result.statusCode).toEqual(200)
    });

    it('test no token authorized endpoint [POST] /product/create', async () => {
        const result = await report(app).post(`/product/create`)
        expect(result.statusCode).toEqual(401)
        expect(result.text).toEqual('"Invalid token JsonWebTokenError: jwt must be provided"')
    });

    it('test no token authorized endpoint [POST] /product/create', async () => {
        const result = await report(app)
            .post(`/product/create`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": productTest.name,
                "price": productTest.price
            })
        expect(result.body.name).toEqual(productTest.name)
        expect(result.body.price).toEqual(productTest.price)
    });

    afterAll(() => {
        user.delete(user_id)
    })
})