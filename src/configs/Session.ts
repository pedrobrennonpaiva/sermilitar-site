import { AdminAuthenticate } from "../models/Admin";
import { UserAuthenticate } from "../models/User";

export class Session {

    static TOKEN_KEY = "Token";
    static TOKEN_KEY_ADMIN = "Token_ADN";
    static USER = "USR";
    static ADMIN = "ADN";
    static EXPORTPAGE = "EXPPG";

    static isAuthenticated = () => {

        if(localStorage.getItem(Session.TOKEN_KEY) !== null)
        {
            var gItem = localStorage.getItem(Session.USER) as string;
            var item = JSON.parse(gItem) as UserAuthenticate;

            var data = new Date();
            var date = new Date(data.valueOf() - (data.getTimezoneOffset() * 60000)).toISOString();
            if(item.tokenExpires < date)
            {
                return false;
            }

            return true;
        }
        else {
            return false;
        }
    }

    static isAuthenticatedAdmin = () => {
        
        if(localStorage.getItem(Session.TOKEN_KEY_ADMIN) !== null)
        {
            var gItem = localStorage.getItem(Session.ADMIN) as string;
            var item = JSON.parse(gItem) as AdminAuthenticate;

            var data = new Date();
            var date = new Date(data.valueOf() - (data.getTimezoneOffset() * 60000)).toISOString();
            
            if(item.tokenExpires < date)
            {
                return false;
            }

            return true;
        }
        else {
            return false;
        }
    }

    static getToken = () => localStorage.getItem(Session.TOKEN_KEY);

    static getTokenAdmin = () => localStorage.getItem(Session.TOKEN_KEY_ADMIN);

    static login = (token: string, user: UserAuthenticate) => {
        localStorage.setItem(Session.TOKEN_KEY, token);
        localStorage.setItem(Session.USER, JSON.stringify(user));
    }
    
    static logout = () => {
        localStorage.removeItem(Session.TOKEN_KEY);
        localStorage.removeItem(Session.USER);
    }
    
    static loginAdmin = (token: string, admin: AdminAuthenticate) => {
        localStorage.setItem(Session.TOKEN_KEY_ADMIN, token);
        localStorage.setItem(Session.ADMIN, JSON.stringify(admin));
    }

    static logoutAdmin = () => {
      localStorage.removeItem(Session.TOKEN_KEY_ADMIN);
      localStorage.removeItem(Session.ADMIN);
    }

    static getUser = () => {
        var gItem = localStorage.getItem(Session.USER) as string;

        try {
            return JSON.parse(gItem);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }

    static getAdmin = () => {
        var gItem = localStorage.getItem(Session.ADMIN) as string;

        try {
            return JSON.parse(gItem);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }

    static getItem = <T>(item: string) : T | undefined => {
        var gItem = localStorage.getItem(item) as string;

        try {
            return JSON.parse(gItem);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }

    static setItem = <T>(name: string, item: T) => {
        localStorage.setItem(name, JSON.stringify(item));
    }

    static removeItem = (item: string) => {
        localStorage.removeItem(item);
    }
}
