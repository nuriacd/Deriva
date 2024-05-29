import { ProductModel } from './product.model';

export class DrinkModel extends ProductModel {
  constructor(
    id: number,
    name: string | null = null,
    price: string,
    description: string | null = null,
    image: Blob | null = null

  ) {
    super(id, name, price, description, image);

  }
}