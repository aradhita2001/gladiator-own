import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
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
  role: String | null = "";
  constructor(private bankService: BankService, private router: Router) { }
  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");

    console.log(this.role);

    if (this.role === 'USER') {
      this.accountsRequest$ = this.bankService.getAccountRequestsByUser(strUserId);
    }
    if (this.role === 'ADMIN') {
      this.accountsRequest$ = this.bankService.getAccountRequests();
    }

    this.accountsRequest$.subscribe((data)=>{
      this.accountRequests = data;
    })

  }
  approve(index: number) {
    console.log(this.accountRequests[index].accountRequestId);
    
    this.bankService.approveAccountRequest(this.accountRequests[index].accountRequestId).subscribe(() => console.log("approved"));
    
  }
  decline(index: number) {
    this.bankService.declineAccountRequest(this.accountRequests[index].accountRequestId).subscribe(() => console.log("declined"));
  }
}
