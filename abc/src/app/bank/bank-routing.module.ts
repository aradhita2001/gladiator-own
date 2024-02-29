import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  { 
    path: "", 
    component: DashboardComponent 
  },
  {
    path: "dashboard",
    component: DashboardComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
