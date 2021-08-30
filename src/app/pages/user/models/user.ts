import { UserShipping } from './user-shipping';
import { UserPayment } from './user-payment';
export class User {

    public id:number;
    public firstName:string;
    public lastName:string;
    public username:string;
    public email:string;   
    public password:string;
    public phone:string;
    public enabled:number
    public userPaymentList: UserPayment[];
    public userShippingList: UserShipping[];
}
