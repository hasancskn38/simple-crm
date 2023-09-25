export class User {
    firstName: string;
    lastName: string;
    email:string;
    birthDate: any;
    street: string;
    zipCode: string;
    city: string;
userId: any|string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName =  obj ? obj.lastName : '';
        this.email =  obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street =    obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city: '';
    }

    public toJSON() {
        return {
        firstName : this.firstName,
        lastName : this.lastName,
        email : this.email,
        birthDate: this.birthDate,
        street : this.street,
        zipCode : this.zipCode, 
        city : this.city
        }
    }

    public setUserObject(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName =  obj ? obj.lastName : '';
        this.email =  obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street =    obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city: '';
    }
}