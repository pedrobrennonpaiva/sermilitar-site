
export class Utils {

    static removeDiacritics = (value: string) => {
        return value
            .replace(" ", "")
            .replace("+", "")
            .replace(":", "")
            .replace(".", "")
            .replace(".", "")
            .replace("-", "")
            .replace("/", "")
            .replace("(", "")
            .replace(")", "");
    }

    static currencyValue = (value: Number) => {
        return value?.toFixed(2).replace(',', '.').replace('.', ',');
    }

    static onlyLetterMask = (value: string) => {
        return value
            .replace(/[^A-Za-z]/ig, '');
    }

    static onlyNumberMask = (value: string) => {
        return value
            .replace(/[^0-9]/ig, '');
    }

    static formatDate = (date?: string | undefined) => {

        var d = date != null ? new Date(date!) : new Date(),
            month = '' + (d.getMonth() + 1),
            // day = '' + (d.getDate() + 1),
            day = '' + (d.getDate()),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    static newDate = (date?: string | undefined) => {
        var d = date != null ? new Date(date!) : new Date();
        return new Date(d.getFullYear(), d.getMonth(), !date ? d.getDate() : d.getDate() + 1);
    }

    static formatDateSplitView = (string: string) => {   
        var dateSplit = string.split('-');
        var date = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
        return date;
    }

    static formatDatePtBr = () => {

        var now = new Date();
        
        return now.toLocaleDateString('ja', {
            year:  'numeric',
            month: '2-digit',
            day:   '2-digit'
        }).replace(/\//g, '-') + ' ' +  now.toTimeString();
    }

    // static formatDateView = (string: string) => {   
    //     var options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     return new Date(string).toLocaleDateString([], options);
    // }

    static numberPhoneMask = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/, "($1) $2-$3");
    }

    static groupBy = <T>(xs: T[], key: string) => {
        return xs.reduce(function(rv: any, x: any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    static alertLocalStorage = (message: string, isSuccess: boolean) => {
        localStorage.setItem('alert-message', message);
        localStorage.setItem('alert-type', isSuccess ? 'alert-success' : 'alert-danger');
    }
}