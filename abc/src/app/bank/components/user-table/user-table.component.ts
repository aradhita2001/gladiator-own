import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/auth/types/user';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  users$: Observable<User[]> = of();
  role: String | null = "";

  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    const strUserId = localStorage.getItem("user_id");

    if (this.role === 'ADMIN') {
      this.users$ = this.bankService.getAllUsers();
    }
  }
}