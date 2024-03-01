import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { TransactionHistoryComponent } from './components/dashboard/transaction-history/transaction-history.component';
import { UsersListComponent } from './components/dashboard/users-list/users-list.component';
import { AccountsListComponent } from './components/dashboard/accounts-list/accounts-list.component';

@NgModule({
  declarations: [
    TransactionComponent,
    DashboardComponent,
    AccountCreationComponent,
    NavbarComponent,
    AccountDetailsComponent,
    AddUserComponent,
    TransactionHistoryComponent,
    UsersListComponent,
    AccountsListComponent,
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent

  ]
})
export class BankModule { }
