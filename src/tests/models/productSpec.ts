import { ProductModel } from "../../models/product";

const product = new ProductModel()

describe("Product Model", () => {
    const productTest = {
        "id": 1,
        "name": "product01",
        "price": 1000
    }
    it('should have an index method', () => {
        expect(product.index).toBeDefined();
    });

    it('should have an show method', () => {
        expect(product.show).toBeDefined();
    });

    it('should have an create method', () => {
        expect(product.create).toBeDefined();
    });

    it('create product should add a product', async () => {
        const result = await product.create(productTest.name,productTest.price)
        expect(result.name).toEqual(productTest.name)
        expect(result.price).toEqual(productTest.price)
    })

    it('index method should return a list of product', async () => {
        expect(() => product.index()).not.toThrow()
    })

    it('show method should return a list of product', async () => {
        const result = await product.show("1")
        expect(result.name).toEqual(productTest.name)
        expect(result.price).toEqual(productTest.price)
    })
})