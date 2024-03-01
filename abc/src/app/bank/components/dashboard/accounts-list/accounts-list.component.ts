import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BankService } from 'src/app/bank/services/bank.service';
import { Account } from 'src/app/bank/types/account';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent {
  accounts$: Observable<Account[]> = of();
  role: String | null = "";
  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");

    if (this.role === 'USER') {
      this.accounts$ = this.bankService.getAccountsByUser(strUserId);


    }
    if (this.role === 'ADMIN') {
      this.accounts$ = this.bankService.getAccounts();
    }
  }
  viewDetails(id:number) {
    this.router.navigateByUrl(`/bank/account-details/${id}`);
  }
}
