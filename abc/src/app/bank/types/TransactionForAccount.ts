export class TransactionForAccount {
    anotherAccountNumber: number;
    anotherUserName: String;
    transactionType: String;
    amount: number;
    transactionDate: Date;

    constructor(data: any) {
        this.anotherAccountNumber = data.anotherAccountNumer;
        this.anotherUserName = data.anotherUserName;
        this.transactionType = data.transactionType;
        this.amount = data.amount;
        this.transactionDate = data.transactionDate

    }
}