import { TransactionForAccount } from "./TransactionForAccount";
 
export class AccountDetails {
    id: number;
    userName: string
    balance: number;
    accountType: string;
    transactions?: TransactionForAccount[];

    constructor(data: any) {
    this.id=data.id;
    this.userName=data.userName;
    this.balance=data.balance;
    this.accountType=data.accountType;
    this.transactions=data.transactions;
  }
}