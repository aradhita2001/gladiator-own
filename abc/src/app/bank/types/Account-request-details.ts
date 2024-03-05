export class AccountRequestDetails {
  accountRequestId: number;
  username: String;
  email: String;
  balance: number;
  accountType: String;
  status: String;


  constructor(data: any) {
    this.accountRequestId = data.accountRequestId;
    this.username = data.username;
    this.email = data.email;
    this.balance = data.balance;
    this.accountType = data.accountType;
    this.status = data.status
  }
}