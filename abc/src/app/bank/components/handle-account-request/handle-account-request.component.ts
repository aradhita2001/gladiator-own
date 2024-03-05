import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BankService } from '../../services/bank.service';
import { AccountRequestDetails } from '../../types/Account-request-details';

@Component({
  selector: 'app-handle-account-request',
  templateUrl: './handle-account-request.component.html',
  styleUrls: ['./handle-account-request.component.css']
})
export class HandleAccountRequestComponent {
  accountsRequest$: Observable<AccountRequestDetails[]> = of();
  accountRequests: AccountRequestDetails[] = [];
  role: String = "";
  approvalMessage: String = "";

  constructor(private authService: AuthService, private bankService: BankService, private router: Router) { }
  ngOnInit(): void {
    this.approvalMessage = "";
    this.role = this.authService.getRole();

    if (this.role === 'ADMIN') {
      this.accountsRequest$ = this.bankService.getAccountRequests();
    }

    this.accountsRequest$.subscribe((data) => {
      this.accountRequests = data;
    })

  }
  approve(index: number) {
    console.log(this.accountRequests[index].accountRequestId);

    this.bankService.approveAccountRequest(this.accountRequests[index].accountRequestId).subscribe(() => {
      this.approvalMessage = 'Approved!';
      setTimeout(() => {
        this.ngOnInit();
      }, 2000);
    });
  }

  decline(index: number) {
    this.bankService.declineAccountRequest(this.accountRequests[index].accountRequestId).subscribe(() => {
      this.approvalMessage = 'Declined!';
      setTimeout(() => {
        this.ngOnInit();
      }, 2000);
    });

  }
}
