import { Account } from './account';
 
export class Transaction {
  sourceAccountNo : number;
  destAccountNo : number;
  amount: number;
  transactionDate: Date;
 
 
  // transactionType: "CREDIT" | "DEBIT";
  constructor(data: any) {
    this.sourceAccountNo = data.sourceAccountNo;
    this.destAccountNo = data.destAccountNo;
    this.amount = data.amount;
    this.transactionDate=data.transactionDate;
  }
}