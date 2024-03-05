import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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

  constructor(private authService: AuthService, private bankService: BankService) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();

    if (this.role === 'ADMIN') {
      this.users$ = this.bankService.getAllUsers();
    }
  }
}