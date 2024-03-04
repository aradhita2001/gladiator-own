import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BankService } from '../../services/bank.service';
import { AccountRequest } from '../../types/Account-request';
import { AccountRequestDetails } from '../../types/Account-request-details';

@Component({
  selector: 'app-account-request-table',
  templateUrl: './account-request-table.component.html',
  styleUrls: ['./account-request-table.component.css']
})
export class AccountRequestTableComponent {
  accountsRequest$: Observable<AccountRequestDetails[]> = of();
  role: String = "";
  userId: number = 0;

  constructor(private authService: AuthService, private bankService: BankService, private router: Router) { }
  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.userId = this.authService.getUserId();


    console.log(this.role);

    this.allRequests();

    this.accountsRequest$.subscribe((data) => {
      console.log(data);

    })
  }

  allRequests(){
    if (this.role === 'USER') {
      this.accountsRequest$ = this.bankService.getAccountRequestsByUser(this.userId);
    }
    if (this.role === 'ADMIN') {
      this.accountsRequest$ = this.bankService.getAccountRequests();
    }
  }

  onlyRequested(){
    if (this.role === 'USER') {
      this.accountsRequest$ = this.bankService.getActiveAccountRequestsByUser(this.userId);
    }
    if (this.role === 'ADMIN') {
      this.accountsRequest$ = this.bankService.getActiveAccountRequests();
    }
  }

  onlyApproved(){
    if (this.role === 'USER') {
      this.accountsRequest$ = this.bankService.getApprovedAccountRequestsByUser(this.userId);
    }
    if (this.role === 'ADMIN') {
      this.accountsRequest$ = this.bankService.getApprovedAccountRequests();
    }
  }

  onlyDeclined(){
    if (this.role === 'USER') {
      this.accountsRequest$ = this.bankService.getDeclinedAccountRequestsByUser(this.userId);
    }
    if (this.role === 'ADMIN') {
      this.accountsRequest$ = this.bankService.getDeclinedAccountRequests();
    }
  }

}
