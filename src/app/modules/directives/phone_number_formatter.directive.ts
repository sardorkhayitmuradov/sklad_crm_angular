export class Phone_Number_Formatter {
    phone_number?:string
    constructor(phoneNumber:string) {
        this.phone_number = phoneNumber.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1-$2-$3-$4-$5');
    }

    formatter(type: string) {
        switch(type) {
            case "space": 
                return this.phone_number?.split('-').join(" ") 
            case 'tire':
                return this.phone_number?.split(" ").join("-")
            default:
                return this.phone_number
        }
    }
}

const phoneNumber = new Phone_Number_Formatter("+998909706096")
console.log(phoneNumber.phone_number);
