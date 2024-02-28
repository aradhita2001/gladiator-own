import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    TransactionComponent,
    DashboardComponent,
    AccountCreationComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule
  ]
})
export class BankModule { }
