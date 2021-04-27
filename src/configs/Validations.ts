
export class Validations {

    static validateRequiredField = (field: string | undefined | null, nameField: string) => {

        if(!field || field === undefined || field === null) {
            return `O campo ${nameField} deve ser preenchido!\n`;
        }
        
        return '';
    }

    static validateUsername = (username: string) => {

        var error = '';

        if(!username || username === undefined || username === null) {
            error += 'O e-mail/username deve ser preenchido!\n';
        }

        return error;
    }

    static validatePassword = (password: string) => {

        var error = '';

        if(!password || password === undefined || password === null) {
            error += 'A senha deve ser preenchida!\n';
        }

        if(password?.length < 8) {
            error += 'A senha deve ter mais de 8 caracteres!\n';
        }

        return error;
    }
}
