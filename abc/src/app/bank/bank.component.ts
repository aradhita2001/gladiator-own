import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../auth/types/user';
import { BankService } from './services/bank.service';
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
  users$:Observable<User[]>=of();
  role: String | null = "";


  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");
    //   this.customers$ = this.bankService.getCustomers();
    
    // console.log(this.customers$);
    console.log(this.role);

    if (this.role === 'USER') {
      this.accounts$ = this.bankService.getAccountsByUser(strUserId);

      this.transactions$ = this.bankService.getTransactionsByUser(strUserId);

    }
    if (this.role === 'ADMIN') {
      this.accounts$ = this.bankService.getAccounts();
      // console.log(this.accounts$);
      this.transactions$ = this.bankService.getAllTranactions();
      this.users$ = this.bankService.getAllUsers();

    }
    

    this.transactions$.subscribe((data) => {
      data.forEach(m=> {console.log(m)});
    })

  }

  editCustomer(): void {
    // this.router.navigate(['/bank/customer/edit', { customerId: customer.customerId,name:customer.name,email:customer.email,username:customer.username, password:customer.password,role:customer.role }]);

  }
  deteteCustomer() {

  }

  viewDetails(id:number) {
    this.router.navigateByUrl(`/bank/account-details/${id}`);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    console.log(localStorage);
    
    this.router.navigate(["/login"]);
  }
}
