import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../auth/types/user';
import { Account } from './types/account';
import { Transaction } from './types/transaction';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {
  accounts$: Observable<Account[]> = of();
  transactions$: Observable<Transaction[]> = of();
  users$: Observable<User[]> = of();
  role: String | null = "";


  constructor( private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");
    console.log(this.role);
  }

  viewDetails(id: number) {
    this.router.navigateByUrl(`/bank/account-details/${id}`);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    console.log(localStorage);

    this.router.navigate(["/login"]);
  }
}
