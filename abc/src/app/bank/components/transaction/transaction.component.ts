import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { User } from "src/app/auth/types/user";
import { TransactionService } from "../../services/transaction.service";
import { Account } from "../../types/account";
import { Transaction } from "../../types/transaction";
 
@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})
export class TransactionComponent {
 
  transactionForm: FormGroup;
  accounts$: Observable<Account[]>=of();
  transactionError$: Observable<string>=of();
  transactionSuccess$: Observable<string>=of();
  isFormSubmitted: boolean = false;
 
  errorMessages: { [key: string]: string } = {
    NOT_ENOUGH_BALANCE: "Not enough balance to complete transaction",
  };
 
  constructor(
    private transactionService: TransactionService,
 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private route: ActivatedRoute,
    // private router: Router
  ) {
    this.transactionForm = this.formBuilder.group({
      user: ["", [Validators.required]],
      destAccountNo: ["",[Validators.required]],
      amount: ["", [Validators.required]],  //add min
    });
  }
 
  onSubmit() {
    this.isFormSubmitted = true;
    //@todo:  when a trasaction is submitted make sure relevant fields (transactionAmount, transactionType) are not empty, and make an api call to perform transaction
    // Once transaction is successfully submitted, update transaction history and outstanding balance for the user
    // If the transaction is not successful due to insufficient balance, display the error message as "Not enough balance to complete transaction"
    // If it is a successful transaction, display the message as "Transaction performed successfully".
    this.transactionError$ = of("");
    this.transactionSuccess$ = of("");
    if (this.transactionForm.invalid) {
      return;
    } else {
      const data = this.transactionForm.value;
      console.log(data);
      data.transactionDate= new Date();
      const transaction: Transaction = new Transaction(data);
      console.log(transaction);
      this.transactionService.performTransaction(transaction).subscribe(
        (res: any) => {
          this.transactionSuccess$ = of("Transaction performed successfully");
        },
        ({ error }) => {
          this.transactionError$ = of(this.errorMessages[error.message]);
        }
      );
    }
  }
 
 
  // Use this method fetch transaction history of a particular user
  getAllTransactions() {
    // List<Transaction> allTransactions = tra
   
 
  }
}