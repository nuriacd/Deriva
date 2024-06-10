import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";

export class OrderModel {
    id: number | null;
    status: string | null;
    address: string | null;
    price: number | null;
    client: string | null;
    products: Array<{quantity: number, product: ProductModel}>;
    date: string | null;
    restaurant: number | null;

    constructor(
        id: number | null = null,
        status: string | null = null,
        address: string | null = null,
        price: number | null = null,
        client: string | null = null,
        products: Array<{quantity: number, product: ProductModel}> = [],
        date: string | null = null,
        restaurant: number | null = null

    ) {
        this.id = id;
        this.status = status;
        this.address = address;
        this.price = price;
        this.client = client;
        this.products = products;
        this.date = date;
        this.restaurant = restaurant;
    }
}