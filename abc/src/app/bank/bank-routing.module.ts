import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './bank.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AccountsListComponent } from './components/dashboard/accounts-list/accounts-list.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UsersListComponent } from './components/dashboard/users-list/users-list.component';

import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  { 
    path: "", 
    component: BankComponent 
  },
  { 
    path: "add-user", 
    component: AddUserComponent 
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children:[
      {path: 'transaction-history',component:TransactionComponent},
      {path: 'users-list',component:UsersListComponent},
      {path: 'accounts-list',component:AccountsListComponent}
    ]
  },
  {
    path: "account-details/:id",
    component: AccountDetailsComponent
  },
  {
    path: 'new-account',
    component: AccountCreationComponent
  },
  {
    path: 'transfer',
    component: TransactionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
