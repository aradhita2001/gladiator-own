import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/auth/types/user';
import { BankService } from '../../services/bank.service';
import { Loan } from '../../types/loan';

@Component({
  selector: 'app-loan-table',
  templateUrl: './loan-table.component.html',
  styleUrls: ['./loan-table.component.css']
})
export class LoanTableComponent {
  loans$: Observable<Loan[]> = of();
  role: String | null = "";

  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");

    if (this.role === 'ADMIN') {
      this.loans$ = this.bankService.getAllLoans();
    }

    if (this.role === 'USER') {
      this.loans$ = this.bankService.getAllLoansByUserId(strUserId);
    }
  }
}
