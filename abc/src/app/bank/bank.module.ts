import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { LoanTableComponent } from './components/loan-table/loan-table.component';
import { AccountRequestTableComponent } from './components/account-request-table/account-request-table.component';
import { HandleAccountRequestComponent } from './components/handle-account-request/handle-account-request.component';
import { LoanComponent } from "./components/loan/loan.component";

@NgModule({
  declarations: [
    TransactionComponent,
    DashboardComponent,
    AccountCreationComponent,
    NavbarComponent,
    AccountDetailsComponent,
    AddUserComponent,
    TransactionTableComponent,
    UserTableComponent,
    AccountTableComponent,
    LoanTableComponent,
    AccountRequestTableComponent,
    HandleAccountRequestComponent,
    LoanComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule,
    // FormGroup
  ]
})
export class BankModule { }
