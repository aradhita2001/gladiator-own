import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { CustomValidators } from "src/app/validators/custom-validator";
import { BankService } from "../../services/bank.service";
import { Account } from "../../types/account";
import { Loan } from "../../types/loan";

@Component({
  selector: "app-loan",
  templateUrl: "./loan.component.html",
  styleUrls: ["./loan.component.css"],
})
export class LoanComponent implements OnInit {

  loanForm!: FormGroup;
  accounts$: Observable<Account[]> = of();
  loanError$: Observable<string> = of();
  loanSuccess$: Observable<string> = of();
  isFormSubmitted: boolean = false;
  userId: any;
  intrest: number = 0;

  constructor(
    private bankService: BankService,

    private formBuilder: FormBuilder,
    private customValidators: CustomValidators,
  ) {
    
  }

  ngOnInit(): void {
      this.accounts$ = this.bankService.getAccountByUserId(this.userId);
      this.loanForm = this.formBuilder.group({
        loanType: ["", [Validators.required]],
        amount: ["", [Validators.required, this.customValidators.AmountValidator]],
        tenure: ["", [Validators.required, Validators.min(3)]],  //add min
      });
  }
  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.loanForm.invalid) {
      return;

    } else {

      const data = this.loanForm.value;
      console.log(data);

      const loan: Loan = new Loan(data);
      console.log(loan);

      this.bankService.saveLoan(loan).subscribe(
        (res: any) => {
          this.loanSuccess$ = of("Loan Approved");
        },
        () => {
          this.loanError$ = of("Loan Not Approved");
        }
      );

    }

  }
  callChange()
  {
    if(this.loanForm.value.loanType == "Home Loan"){
      this.intrest = 9;
    }
    else if(this.loanForm.value.loanType == "Education Loan"){
      this.intrest = 8;
    }
    else if(this.loanForm.value.loanType == "Personal Loan"){
      this.intrest = 7;
    }
    else{
      this.intrest = 6;
    }
  }
}