import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Account } from "../../types/account";
import { Transaction } from "../../types/transaction";
import { CustomValidators } from "src/app/validators/custom-validator";
import { BankService } from "../../services/bank.service";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})
export class TransactionComponent implements OnInit {

  transactionForm!: FormGroup;
  accounts$: Observable<Account[]> = of();
  transactionError$: Observable<string> = of();
  transactionSuccess$: Observable<string> = of();
  isFormSubmitted: boolean = false;
  userId: any;

  errorMessages: { [key: string]: string } = {
    NOT_ENOUGH_BALANCE: "Not enough balance to complete transaction",
  };

  constructor(
    private bankService: BankService,
    private customValidator: CustomValidators,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.accounts$ = this.bankService.getAccountByUserId(this.userId);

    this.transactionForm = this.formBuilder.group({
      sourceAccountId: ["", [Validators.required]],
      destinationAccountId: ["", [Validators.required, this.customValidator.AccountNumberValidator]],
      amount: ["", [Validators.required, this.customValidator.AmountValidator]],  //add min
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.transactionForm.invalid) {
      return;
    }
    else {

      const data = this.transactionForm.value;
      console.log(data);
      const transaction: Transaction = new Transaction(data);
      console.log(transaction);

      this.bankService.addTransaction(transaction).subscribe(
        () => {
          this.transactionSuccess$ = of("success");
        },
        () => {
          this.transactionError$ = of("failed");
        }
      );

    }
  }
}