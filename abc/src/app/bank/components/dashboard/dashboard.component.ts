import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BankService } from "../../services/bank.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  role: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

}
