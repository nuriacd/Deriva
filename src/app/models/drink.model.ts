import { ProductModel } from './product.model';

export class DrinkModel extends ProductModel {
  quantity: number | null;
  
  constructor(
    id: number,
    name: string | null = null,
    price: string,
    description: string | null = null,
    image: Blob | null = null,
    quantity: number | null = null,

  ) {
    super(id, name, price, description, image);
    this.quantity = quantity;
  }
}