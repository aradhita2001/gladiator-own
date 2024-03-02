import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Account } from '../../types/account';
import { Transaction } from '../../types/transaction';
import { BankService } from "../../services/bank.service";
import { LogoutComponent } from 'src/app/auth/components/logout/logout.component';
import { User } from 'src/app/auth/types/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  accounts$: Observable<Account[]> = of();
  transactions$: Observable<Transaction[]> = of();
  users$: Observable<User[]> = of();
  role: String | null = "";


  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");



    console.log(this.role);

    if (this.role === 'USER') {
      this.accounts$ = this.bankService.getAccountsByUser(strUserId);

      this.transactions$ = this.bankService.getTransactionsByUser(strUserId);

    }
    if (this.role === 'ADMIN') {
      this.accounts$ = this.bankService.getAccounts();

      this.transactions$ = this.bankService.getAllTranactions();
      this.users$ = this.bankService.getAllUsers();

    }


    this.transactions$.subscribe((data) => {
      data.forEach(m => { console.log(m) });
    })

  }

  editCustomer(): void {
    // this.router.navigate(['/bank/customer/edit', { customerId: customer.customerId,name:customer.name,email:customer.email,username:customer.username, password:customer.password,role:customer.role }]);

  }
  deteteCustomer() {

  }

  viewDetails(id: number) {
    this.router.navigateByUrl(`/bank/account/${id}`);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    console.log(localStorage);

    this.router.navigate(["/auth"]);
  }

}
