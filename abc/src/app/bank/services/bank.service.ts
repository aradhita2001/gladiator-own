import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../types/transaction';
import { Account } from "../types/account";
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../../auth/types/user';
import { AccountDetails } from '../types/AccountDetails';
import { TransactionForAccount } from '../types/TransactionForAccount';
import { Loan } from '../types/loan';
import { AccountCreationRequest } from '../types/AccountCreationRequest';
@Injectable({
  providedIn: 'root'
})
export class BankService {

  private baseUrl=`${environment.apiUrl}`

  constructor(private http : HttpClient){}
  getAllTranactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`)
  }
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`)
  }

  getAccountById(accountId: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${this.baseUrl}/accounts/${accountId}`);
  }

  getTransactionsByUser(userId: string | null): Observable<Transaction[]> {
  return this.http.get<Transaction[]>(`${this.baseUrl}/transactions/user/${userId}`)
  }
 

  getAccountsByUser(strUserId: string | null): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/user/${strUserId}`);
  }
  
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans`);
  }
  getAllLoansByUserId(userId: string | null): Observable<Loan[]> {
   return this.http.get<Loan[]>(`${this.baseUrl}/loans/user/${userId}`);
  }

  saveLoan(loan : Loan): Observable<any>{
    return this.http.post(`${this.baseUrl}/loans`, loan);
  }
  addAccountRequest(account: AccountCreationRequest) {
    return this.http.post<Account>(`${this.baseUrl}/accounts/account-request`,account);
  }
}
