export class AccountRequest {
    userId : number;
    accountType : String ;
    balance:number;
 
    constructor(data: any) {
      this.userId = data.userId;
      this.accountType = data.accountType;
      this.balance = data.balance;
    }
  }