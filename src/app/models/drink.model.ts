import { ProductModel } from './product.model';

export class DrinkModel extends ProductModel {
  constructor(
    id: number | null = null,
    name: string | null = null,
    price: string | null = null,
    description: string | null = null,

  ) {
    super(id, name, price, description);

  }
}