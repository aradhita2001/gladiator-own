import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BankService } from 'src/app/bank/services/bank.service';
import { Loan } from 'src/app/bank/types/loan';
 
@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent {
 
  emi: number = 0;
  emiCalculatorForm: FormGroup;
  interest: number = 0;
  emi$: Observable<any> = of();
 
 
  // accounts$: Observable<Account[]> = of();
  emiCalculatorError$: Observable<string> = of();
  emiCalculatorSuccess$: Observable<string> = of();
  isFormSubmitted: boolean = false;
  // userId: any;
 
 
 
  constructor(
    private bankService: BankService,
 
    private formBuilder: FormBuilder,
 
    private router: Router
  ) {
    this.emiCalculatorForm = this.formBuilder.group({
      loanType: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      tenure: ["", [Validators.required]],  //add min
    });
  }
 
 
  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.emiCalculatorForm.invalid) {
      return;
 
    } else {
 
      const data = this.emiCalculatorForm.value;
 
      console.log(data);
 
      const loan: Loan = new Loan(data);
      console.log(loan);
 
      this.bankService.getEMI(loan)
        .subscribe(
          (res: any) => {
            this.emi = res;//of("Success");
            console.log(this.emi);
 
          },
          () => {
            this.emiCalculatorError$ = of("fail");
          }
        );
 
    }
 
  }
 
  callChange()
  {
 
    if(this.emiCalculatorForm.value.loanType == "Home Loan"){
      this.interest = 9;
    }
    else if(this.emiCalculatorForm.value.loanType == "Education Loan"){
      this.interest = 8;
    }
    else if(this.emiCalculatorForm.value.loanType == "Personal Loan"){
      this.interest = 7;
    }
    else{
      this.interest = 6;
    }
 
    const data = this.emiCalculatorForm.value;
      console.log(data);
      console.log(data);
 
      const loan: Loan = new Loan(data);
 
    this.emi$ = this.bankService.getEMI(loan)
        this.emi$.subscribe(
          (res: any) => {
            this.emi = res;//of("Success");
            console.log(this.emi);
 
          },
          () => {
            this.emiCalculatorError$ = of("fail");
          }
        );
   
  }
 
 
}
 