import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BankService } from 'src/app/bank/services/bank.service';
import { Transaction } from 'src/app/bank/types/transaction';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent {
  transactions$: Observable<Transaction[]> = of();
  role: String | null = "";

  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");

    if(this.role==='USER'){
      this.transactions$ = this.bankService.getTransactionsByUser(strUserId);
    }
    if(this.role=='ADMIN'){
      this.transactions$=this.bankService.getAllTranactions();
    }
    this.transactions$.subscribe((data) => {
      data.forEach(m=> {console.log(m)});
    })
  }
}
