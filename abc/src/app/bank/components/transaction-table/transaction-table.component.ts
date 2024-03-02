import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BankService } from '../../services/bank.service';
import { Transaction } from '../../types/transaction';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {
  transactions$: Observable<Transaction[]> = of();
  role: String | null = "";

  constructor(private bankService: BankService, private router: Router) { }

  
  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");

    if (this.role === 'USER') {
      this.transactions$ = this.bankService.getTransactionsByUser(strUserId);
    }
    if (this.role === 'ADMIN') {
      this.transactions$ = this.bankService.getAllTranactions();
    }
    this.transactions$.subscribe((data) => {
      data.forEach(m => { console.log(m) });
    })
  }
  

}
