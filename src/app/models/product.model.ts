export class ProductModel {
    id: number | null;
    name: string | null;
    price: string | null;
    description: string | null;
  
    constructor(
        id: number | null = null,
        name: string | null = null,
        price: string | null = null,
        description: string | null = null
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}