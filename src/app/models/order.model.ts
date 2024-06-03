import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";

export class OrderModel {
    id: number | null;
    status: string | null;
    address: string | null;
    price: number | null;
    client: UserModel | null;
    products: {id: number,  quantity: number}[];
    date: string | null;

    constructor(
        id: number | null = null,
        status: string | null = null,
        address: string | null = null,
        price: number | null = null,
        client: UserModel | null = null,
        products: {id: number,  quantity: number}[] = new Array<{id: number,  quantity: number}>(),
        date: string | null = null
    ) {
        this.id = id;
        this.status = status;
        this.address = address;
        this.price = price;
        this.client = client;
        this.products = products;
        this.date = date;
    }
}