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
 
 
  accountForm:any={AccountType:null}

  accountError$: Observable<string> = of();

  accountSuccess$: Observable<string> = of();

  isFormSubmitted: boolean = false;

  

  constructor(private formBuilder: FormBuilder,private transactionService: TransactionService, private router:Router) 

    {

      this.accountForm = this.formBuilder.group({

        Accounts:['',[Validators.required]]

      });

   }

  // ngOnInit(): void {

    onSubmit() {

      this.isFormSubmitted = true;

      this.accountSuccess$ = of('');

      this.accountError$ = of('');

      if (this.accountForm.invalid) {

        return;

      } else {

        const data= this.accountForm.value;

        console.log(data);

        const account : Account = new Account(data);

        // this.transactionService.addAccount(account).subscribe(

        //   (res: any) => {

        //     this.accountSuccess$ = of("Account created successfully");

        //   },

        //   () => {

        //     this.accountError$ = of("Unable to create account");

        //   }

        // );

      }

    }

}
 