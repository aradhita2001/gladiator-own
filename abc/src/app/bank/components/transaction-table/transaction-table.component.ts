import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BankService } from '../../services/bank.service';
import { Transaction } from '../../types/transaction';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {
  transactions$: Observable<Transaction[]> = of();
  role: String = "";
  userId: number = 0;

  constructor(private authService: AuthService, private bankService: BankService) { }


  ngOnInit(): void {
    this.role = this.authService.getRole();

    if (this.role === 'USER') {
      this.userId = this.authService.getUserId();
      this.transactions$ = this.bankService.getTransactionsByUser(this.userId);
    }
    if (this.role === 'ADMIN') {
      this.transactions$ = this.bankService.getAllTranactions();
    }
  }
}
