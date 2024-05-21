export class OrderModel {
    id: number | null;
    status: string | null;
    address: string | null;
    price: string | null;
    client: any | null;
    products: any[];
    date: string | null;

    constructor(
        id: number | null = null,
        status: string | null = null,
        address: string | null = null,
        price: string | null = null,
        client: any | null = null,
        products: any[] = [],
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