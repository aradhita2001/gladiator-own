import { User } from "src/app/auth/types/user";
import { Transaction } from "./transaction";
import { TransactionForAccount } from "./TransactionForAccount";

 
export class AccountCreationRequest {
    customer : User;
    // userId: number;
    accountType: string;
 
  constructor(data: any) {
    this.customer = new User(data);
    this.customer.userId = data.userId;
    this.accountType=data.accountType;
  }
}