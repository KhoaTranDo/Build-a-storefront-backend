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

    it('should have an add product into order method', () => {
        expect(order.createProductOrder).toBeDefined();
    });

    it('should have show order detail method', () => {
        expect(order.productOrderDetail).toBeDefined();
    });

    it('create method should add order', async () => {
        const result = await order.create(user_id, orderTest.status)
        expect(result.user_id).toEqual(user_id)
        expect(result.status).toBeTrue()
    })

    it('index method should return order', async () => {
        expect(() => order.index()).not.toThrow();
    })

    it('show method should return order', async () => {
        const idOrder = (await order.create(user_id, orderTest.status))
        const result = await order.show(idOrder.user_id)
        expect(() => { result }).not.toThrow()
    })

    it('show method add product into order', async () => {
        let idOrder :string
        idOrder = (await order.create(user_id, orderTest.status)).id.toString()
        const productOrder = (await order.createProductOrder(product_id,1000,idOrder))
        expect(productOrder.product_id).toEqual(product_id)
        expect(productOrder.quantity).toEqual(1000)
        expect(productOrder.order_id).toEqual(idOrder)
    })

    it('show method get order detail', async () => {
        let idOrder :string
        idOrder = (await order.create(user_id, orderTest.status)).id.toString()
        const productOrder = (await order.productOrderDetail(idOrder))
        expect(() => { productOrder }).not.toThrow()
    })
})