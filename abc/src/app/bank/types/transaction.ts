import { Account } from './account';
 
export class Transaction {
  sourceAccountId : number;
  destinationAccountId : number;
  amount: number;
  transactionDate: Date;
 
 
  // transactionType: "CREDIT" | "DEBIT";
  constructor(data: any) {
    this.sourceAccountId = data.sourceAccountId;
    this.destinationAccountId = data.destinationAccountId;
    this.amount = data.amount;
    this.transactionDate=data.timeStamp;
  }
}