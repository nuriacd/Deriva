import { ProductModel } from './product.model';
import { IngredientModel } from './ingredient.model';

export class DishModel extends ProductModel {
    type: string | null;
    recipe: string | null;
    ingredients: IngredientModel[];

    constructor(
        id: number | null = null,
        name: string | null = null,
        price: string | null = null,
        description: string | null = null,
        type: string | null = null,
        recipe: string | null = null,
        ingredients: IngredientModel[] = []
    ) {
        super(id, name, price, description);
        this.type = type;
        this.recipe = recipe;
        this.ingredients = ingredients;
    }
}