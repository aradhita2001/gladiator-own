import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Account } from '../../types/account';
import { Transaction } from '../../types/transaction';
import { BankService } from "../../services/bank.service";
import { User } from 'src/app/auth/types/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  role: String | null = "";


  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");
    console.log(this.role);
  }

  

  

  

}
