import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, map, of } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { User } from "src/app/auth/types/user";
import { TransactionService } from "../../services/transaction.service";
import { Account } from "../../types/account";
import { Transaction } from "../../types/transaction";
import { CustomValidators } from "src/app/validators/custom-validator";
 
@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})
export class TransactionComponent implements OnInit{
 
  transactionForm: FormGroup;
  accounts$: Observable<Account[]>=of();
  transactionError$: Observable<string>=of();
  transactionSuccess$: Observable<string>=of();
  isFormSubmitted: boolean = false;
  userId: any;
 
  errorMessages: { [key: string]: string } = {
    NOT_ENOUGH_BALANCE: "Not enough balance to complete transaction",
  };
 
  constructor(
    private transactionService: TransactionService,
    private customValidator :CustomValidators,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transactionForm = this.formBuilder.group({
      sourceAccountId: ["", [Validators.required]],
      destinationAccountId: ["",[Validators.required,this.customValidator.AccountNumberValidator]],
      amount: ["", [Validators.required,this.customValidator.AmountValidator]],  //add min
    });
  }

  

  ngOnInit(): void {
    if(!!localStorage.getItem("user_id")){
      this.userId = Number(localStorage.getItem("user_id"));
      console.log(this.userId);
      
      this.accounts$=this.transactionService.getAccountByUserId(this.userId);
      
    }else{
      console.log("userId not found");
      console.log("Login required");
      this.router.navigateByUrl("/auth");

      
    }
}
onSubmit(): void{
  this.isFormSubmitted = true;
  if (this.transactionForm.invalid) {
    return;

  } else {

    const data= this.transactionForm.value;

    console.log(data);

    const transaction : Transaction = new Transaction(data);
    console.log(transaction);

    this.transactionService.addTransaction(transaction).subscribe(
    (res: any) => {
  this.transactionSuccess$ = of("success");
      },
  () => {
        this.transactionError$ = of("failed");

      }

    );

  }

}


}