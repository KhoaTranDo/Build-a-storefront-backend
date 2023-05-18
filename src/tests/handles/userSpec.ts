import app from "../../server"
import report from "supertest"
import { UserModel } from "../../models/user"

describe("Test endpoint user", () => {
    const user = new UserModel()
    const userTest = {
        "id": 1,
        "firstname": "user1",
        "lastname": "user1",
        "password": "1234"
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

    it('test no token authorized endpoint [GET] /user', async () => {
        const result = await report(app).get(`/user/`)
        expect(result.statusCode).toEqual(401)
        expect(result.text).toEqual('"Invalid token JsonWebTokenError: jwt must be provided"')
    });

    it('test no token authorized endpoint [GET] /user/:id', async () => {
        const result = await report(app).get(`/user/${user_id}`)
        expect(result.statusCode).toEqual(401)
        expect(result.text).toEqual('"Invalid token JsonWebTokenError: jwt must be provided"')
    });

    it('test endpoint [GET] /user', async () => {
        console.log(token)
        const result = await report(app).get(`/user/`).set('Authorization', `Bearer ${token}`)
        expect(result.statusCode).toEqual(200)
    });

    it('test endpoint [GET] /user/:id', async () => {
        const result = await report(app).get(`/user/${user_id}`).set('Authorization', `Bearer ${token}`)
        expect(result.statusCode).toEqual(200)
    });

    it('test endpoint [POST] /user/create', async () => {
        const result = await report(app).post(`/user/create`)
            .send({
                firstname: userTest.firstname,
                lastname: userTest.lastname,
                password: userTest.password
            })
        expect(result.statusCode).toEqual(200)
    });

    afterAll(() => {
        user.delete(user_id)
    })

})