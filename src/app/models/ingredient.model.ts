export class IngredientModel {
    id: number | null;
    name: string | null;
    supplier: string | null;
    allergen: any[];
  
    constructor(
        id: number | null = null,
        name: string | null = null,
        supplier: string | null = null,
        allergen: any[] = []
    ) {
        this.id = id;
        this.name = name;
        this.supplier = supplier;
        this.allergen = allergen;
    }
}