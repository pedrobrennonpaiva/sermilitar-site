import { Base } from "./base/Base";

export class Admin extends Base {

    name: string = '';

    username: string = '';

    birthday: Date | string = new Date();

    numberPhone: string = '';

    email: string = '';

    password: string = '';
}

export class AdminAuthenticate extends Base {

    name: string = '';

    username: string = '';

    birthday: Date | string = new Date();

    numberPhone: string = '';

    email: string = '';

    password: string = '';

    token: string = '';

    tokenExpires: Date | string = new Date();
}