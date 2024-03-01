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
 

  editCustomer(): void {
    // this.router.navigate(['/bank/customer/edit', { customerId: customer.customerId,name:customer.name,email:customer.email,username:customer.username, password:customer.password,role:customer.role }]);

  }
  deteteCustomer() {

  }

  

  logout(){
    
  }
 
}
