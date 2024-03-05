import { User } from "src/app/auth/types/user";

 
export class AccountCreationRequest {
    customer : User;
    accountType: string;
 
  constructor(data: any) {
    this.customer = new User(data);
    this.customer.userId = data.userId;
    this.accountType=data.accountType;
  }
}