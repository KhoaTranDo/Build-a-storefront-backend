import { OrderModel } from "../../models/order";
import { ProductModel } from "../../models/product";
import { UserModel } from "../../models/user";

const order = new OrderModel
const product = new ProductModel()
const user = new UserModel()
describe("Product Model", () => {
    const orderTest = {
        "quantity": 2,
        "status": "active"
    }
    const userTest = {
        "firstname": "firstname01",
        "lastname": "lastname01",
        "password": 'password123'
    }
    const productTest = {
        "name": "product01",
        "price": 1000
    }

    let product_id: string, user_id: string
    beforeAll(async () => {
        product_id = (await product.create(productTest.name, productTest.price)).id.toString()
        user_id = (await user.create(userTest.firstname, userTest.lastname, userTest.password)).id.toString()
    })
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });

    it('should have an show method', () => {
        expect(order.show).toBeDefined();
    });

    it('should have an create method', () => {
        expect(order.create).toBeDefined();
    });

    it('create method should add order', async () => {
        const result = await order.create(user_id, product_id, orderTest.quantity, orderTest.status)
        expect(result.product_id).toEqual(product_id)
        expect(result.user_id).toEqual(user_id)
        expect(result.quantity).toEqual(orderTest.quantity)
        expect(result.status).toBeTrue()
    })

    it('index method should return order', async () => {
        expect(() => order.index()).not.toThrow();
    })

    it('show method should return order', async () => {
        const idOrder = (await order.create(user_id, product_id, orderTest.quantity, orderTest.status))
        const result = await order.show(idOrder.user_id)
        expect(() => { result }).not.toThrow()
    })
})