export class IngredientModel {
    id: number | null;
    name: string | null;
    supplier: string | null;
    allergen: string | null;
    quantity: number | null;

    constructor(
        id: number | null = null,
        name: string | null = null,
        supplier: string | null = null,
        allergen:string | null = null,
        quantity: number | null = null
    ) {
        this.id = id;
        this.name = name;
        this.supplier = supplier;
        this.allergen = allergen;
        this.quantity = quantity;
    }
}