import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BankService } from '../../services/bank.service';
import { TransactionService } from '../../services/transaction.service';
import { Account } from '../../types/account';
import { Transaction } from '../../types/transaction';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  accountId: number=0;
  transactions$: Observable<Transaction[]>= of();
  account$: Observable<Account> = of();
  account!: Account;

  constructor(private transactionService: TransactionService , private bankService: BankService , private route:ActivatedRoute){}
 
  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.accountId=params['id'];
      // this.transactions$ = this.transactionService.getTransactionByAccount(this.accountId);
      this.account$ = this.bankService.getAccountById(this.accountId);
      this.account$.subscribe(data => {
        this.account = data;
        console.log(this.account);
        
      })
    })
  }
}
