import { User } from "src/app/auth/types/user";
 
export class Account {
  accountId:number;
  user: User;
 accountType: string;
 balance: number;
 
  constructor(data: any) {
    this.accountId=data.accountId;
    this.user=data.user;
    this.accountType = data.accountType;
    this.balance = data.balance !== undefined ? data.balance : 0;
}
}