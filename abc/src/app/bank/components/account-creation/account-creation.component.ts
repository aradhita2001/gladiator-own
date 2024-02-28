import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { Account } from '../../types/account';
 
@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent {
 
  accountForm:FormGroup;
  accountError$: Observable<string> =of();
  accountSuccess$: Observable<string>=of();
  isFormSubmitted: boolean = false;
  // transactionService: TransactionService;
  constructor(private formBuilder: FormBuilder, private router:Router, private transactionService : TransactionService)
    {
      this.accountForm = this.formBuilder.group({
        accountType:['',[Validators.required]],
        balance:['',[Validators.required]]
    });
   }
  // ngOnInit(): void {
    onSubmit() {
      this.isFormSubmitted = true;
      this.accountSuccess$ = of('');
      this.accountError$ = of('');
      console.log(this.accountForm.value);
      if (this.accountForm.invalid) {
        this.router.navigateByUrl('');   //add
      } else {
        const data= this.accountForm.value;
        console.log(data);
        const account : Account = new Account(data);
        this.transactionService.addAccount(account).subscribe(
          (res: any) => {
            this.accountSuccess$ = of("Account created successfully");
          },
          () => {
            this.accountError$ = of("Unable to create account");
          }
        );
      }
    }
 
}
