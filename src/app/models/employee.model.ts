import { UserModel } from './user.model';
import { RestaurantModel } from './restaurant.model';

export class EmployeeModel extends UserModel {
    type: string | null;
    restaurant: RestaurantModel | null;

    constructor(
        id: number | null = null,
        email: string | null = null,
        roles: string[] = [],
        password: string | null = null,
        name: string | null = null,
        phone: string | null = null,
        type: string | null = null,
        restaurant: RestaurantModel | null = null
    ) {
        super(id, email, roles, password, name, phone);
        this.type = type;
        this.restaurant = restaurant;
    }
}