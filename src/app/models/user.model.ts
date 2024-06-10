export class UserModel {
    id: number | null;
    email: string | null;
    name: string | null;
    phone: string | null;
  
    constructor(
        id: number | null = null,
        email: string | null = null,
        name: string | null = null,
        phone: string | null = null,
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.phone = phone;
    }
}