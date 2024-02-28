import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transactionForm = this.formBuilder.group({
      user: ["", [Validators.required]],
      destAccountNo: ["",[Validators.required]],
      amount: ["", [Validators.required]],  //add min
    });
  }
 
  onSubmit() {
    
  }
 
 
  getAllTransactions() {
   
 
  }
}