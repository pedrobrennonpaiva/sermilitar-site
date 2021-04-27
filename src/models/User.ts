import { Base } from "./base/Base";

export class User extends Base {

    name: string = '';

    username: string = '';

    birthday: Date | string = new Date();
    
    cpf: string = '';
    
    email: string = '';
    
    password: string = '';
    
    numberPhone: string = '';
}

export class UserAuthenticate extends Base {

    name: string = '';

    username: string = '';
    
    image: string = '';

    email: string = '';

    isActive: boolean = true;

    token: string = '';

    tokenExpires: Date | string = new Date();
}
