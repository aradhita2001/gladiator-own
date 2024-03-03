import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BankService } from '../../services/bank.service';
import { Account } from '../../types/account';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.css']
})
export class AccountTableComponent {
  accounts$: Observable<Account[]> = of();
  role: String | null = "";

  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("userId");


    console.log(this.role);

    if (this.role === 'USER') {
      this.accounts$ = this.bankService.getAccountsByUser(strUserId);
    }
    if (this.role === 'ADMIN') {
      this.accounts$ = this.bankService.getAccounts();
    }

}
viewDetails(id: number) {
  this.router.navigateByUrl(`/bank/account/${id}`);
}

}