import { User } from "src/app/auth/types/user";

export class Loan {
    id: number;
    loanType: string;
    amount: number;
    tenure: number;
    customer: User;

    constructor(data: any) {
        this.customer = new User({userId: undefined});
        this.customer.userId = Number(localStorage.getItem("user_id"));
        this.id = data.id;
        this.loanType = data.loanType;
        this.amount = data.amount;
        this.tenure = data.tenure;
    }
}