import { EmployeeModel } from './employee.model';
import { DrinkModel } from './drink.model';
import { IngredientModel } from './ingredient.model';

export class RestaurantModel {
    id: number | null;
    name: string | null;
    address: string | null;
    latitude: string | null;
    longitude: string | null;
    radius: number | null;
    employees: EmployeeModel[];
    drinks: DrinkModel[];
    ingredients: IngredientModel[];

    constructor(
        id: number | null = null,
        name: string | null = null,
        address: string | null = null,
        latitude: string | null = null,
        longitude: string | null = null,
        radius: number | null = null,
        employees: EmployeeModel[] = [],
        drinks: DrinkModel[] = [],
        ingredients: IngredientModel[] = []
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
        this.employees = employees;
        this.drinks = drinks;
        this.ingredients = ingredients;
    }
}