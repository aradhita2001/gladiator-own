import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BankService } from '../../services/bank.service';
import { AccountDetails } from '../../types/AccountDetails';
import { TransactionForAccount } from '../../types/TransactionForAccount';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit{
  accountId: number=0;
  transactions$: Observable<TransactionForAccount[]>= of();
  account$: Observable<AccountDetails> = of();
  account!: AccountDetails;

  constructor(private bankService: BankService , private route:ActivatedRoute){}
 
  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.accountId=params['id'];
      this.account$ = this.bankService.getAccountById(this.accountId);
      this.account$.subscribe(data => {
        this.account = data;
      })

      this.transactions$ = this.bankService.getTransactionsByAccount(this.accountId);
      this.transactions$.subscribe(data => {console.log(data);});
    })
  }

  viewAll(){
    this.transactions$ = this.bankService.getTransactionsByAccount(this.accountId);
  }

  viewDebit(){
    this.transactions$ = this.bankService.getDebitTransactionsByAccount(this.accountId);
  }

  viewCredit(){
    this.transactions$ = this.bankService.getCreditTransactionsByAccount(this.accountId);
  }
}
