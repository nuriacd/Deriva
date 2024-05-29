import { ProductModel } from './product.model';
import { IngredientModel } from './ingredient.model';

export class DishModel extends ProductModel {
    type: string | null;
    recipe: string | null;
    ingredients: IngredientModel[];

    constructor(
        id: number,
        name: string | null = null,
        price: string,
        description: string | null = null,
        type: string | null = null,
        recipe: string | null = null,
        ingredients: IngredientModel[] = [],
        image: Blob | null = null

    ) {
        super(id, name, price, description, image);
        this.type = type;
        this.recipe = recipe;
        this.ingredients = ingredients;
    }
}