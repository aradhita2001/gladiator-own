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
import { AccountRequest } from '../types/Account-request';
import { AccountRequestDetails } from '../types/Account-request-details';
@Injectable({
  providedIn: 'root'
})
export class BankService {
  approveAccountRequest(accountRequestId: number) :Observable<any> {
    return this.http.put(`${this.baseUrl}/accounts/account-request/approve/${accountRequestId}`,null)
  }
  declineAccountRequest(accountRequestId: number) {
    return this.http.put(`${this.baseUrl}/accounts/account-request/decline/${accountRequestId}`,null)
  }
  getAccountRequests(): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request`);
    
  }
  getAccountRequestsByUser(strUserId: string | null): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request/user/${strUserId}`);
  }

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
  addAccountRequest(account: AccountRequest) {
    return this.http.post<Account>(`${this.baseUrl}/accounts/account-request`,account);
  }
}
