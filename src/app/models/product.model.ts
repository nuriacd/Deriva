export class ProductModel {
    id: number;
    name: string | null;
    price: string;
    description: string | null;
    image: Blob | null;

    constructor(
        id: number,
        name: string | null = null,
        price: string,
        description: string | null = null,
        image: Blob | null = null
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}