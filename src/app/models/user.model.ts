export class UserModel {
    id: number | null;
    email: string | null;
    roles: string[];
    password: string | null;
    name: string | null;
    phone: string | null;
  
    constructor(
        id: number | null = null,
        email: string | null = null,
        roles: string[] = [],
        password: string | null = null,
        name: string | null = null,
        phone: string | null = null,
    ) {
        this.id = id;
        this.email = email;
        this.roles = roles;
        this.password = password;
        this.name = name;
        this.phone = phone;
    }
}