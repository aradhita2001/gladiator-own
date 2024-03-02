import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './bank.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HandleAccountRequestComponent } from './components/handle-account-request/handle-account-request.component';
import { LoanComponent } from './components/loan/loan.component';
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  {
    path: "",
    component: BankComponent,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "add-user", component: AddUserComponent },
      { path: "transaction", component: TransactionComponent },
      { path: "create-account", component: AccountCreationComponent },
      { path: "account/:id", component: AccountDetailsComponent },
      {path: "account-requests", component: HandleAccountRequestComponent},
      {path: "apply-loan", component: LoanComponent}


    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
