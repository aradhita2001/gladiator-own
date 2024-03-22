import { Component } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { filter, Observable, of } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
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
  role: string = "";

  constructor(private authService: AuthService, private router: Router) {
    if (!authService.validateLogin()) this.logout();

    router.events
			.pipe(
				filter(
					( event: Event ) => {
						return( event instanceof NavigationStart );
					}
				)
			).subscribe(
				( event: Event ) => {
        if((event as NavigationStart).restoredState) {
         this.logout(); 
        }
      }
    )
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  viewDetails(id: number) {
    this.router.navigateByUrl(`/bank/account-details/${id}`);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}