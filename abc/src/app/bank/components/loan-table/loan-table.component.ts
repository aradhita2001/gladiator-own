import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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
  role: String = "";
  userId = 0;

  constructor(private authService: AuthService, private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.userId = this.authService.getUserId();

    if (this.role === 'ADMIN') {
      this.loans$ = this.bankService.getAllLoans();
    }

    if (this.role === 'USER') {
      this.loans$ = this.bankService.getAllLoansByUserId(this.userId);
    }
  }
}
