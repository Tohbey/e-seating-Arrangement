import { logging } from 'protractor';
import { Role } from './role';

export class User{
    id:number;
    userId:number;
    userSurname:String;
    userOtherName:String;
    userEmail:String;
    userPassword:String;
    userIsActive:number;
    userPhoneNumber:String;
    department:String;
    roles:Role[];
}
