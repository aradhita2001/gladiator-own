
export class Loan {
    id: number;
    loanType: string;
    amount: number;
    tenure: number;



    constructor(data: any) {
        this.id = data.id;
        this.loanType = data.loanType;
        this.amount = data.amount;
        this.tenure = data.tenure;
    }
}