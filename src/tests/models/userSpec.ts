import { UserModel } from "../../models/user";

const user = new UserModel
describe("Product Model", () => {
    const userTest = {
        "id": 1,
        "firstname": "firstname01",
        "lastname": "lastname01",
        "password": 'password123'
    }
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });

    it('should have an show method', () => {
        expect(user.show).toBeDefined();
    });

    it('should have an create method', () => {
        expect(user.create).toBeDefined();
    });

    it('should have an login method', () => {
        expect(user.login).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await user.create(userTest.firstname,userTest.lastname,userTest.password)        
        expect(result.firstname).toEqual(userTest.firstname)
        expect(result.lastname).toEqual(userTest.lastname)
    })

    it('index method should return a list of user', async () => {
        const result = await user.index()
        expect(() => {result}).not.toThrow();
    })

    it('show method should return a user', async () => {
        const createResult = await user.create(userTest.firstname,userTest.lastname,userTest.password)
        const result = await user.show((createResult.id as number).toString())
        expect(result.firstname).toEqual(userTest.firstname)
        expect(result.lastname).toEqual(userTest.lastname)
    })
})