import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../types/transaction';
import { Account } from "../types/account";
import { HttpClient } from '@angular/common/http';
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
  // getName(userId: number): Observable<string> {
  //   return this.http.get<string>(`${this.baseUrl}/users/name/${userId}`);
  // }
  getActiveAccountRequestsByUser(userId: number): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request/requested/user/${userId}`);
  }
  
  getActiveAccountRequests(): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request/requested`);
  }
  getApprovedAccountRequestsByUser(userId: number): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request/approved/user/${userId}`);
  }
  getApprovedAccountRequests(): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request/approved`);
    
  }
  getDeclinedAccountRequestsByUser(userId: number): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request/declined/user/${userId}`);

  }
  getDeclinedAccountRequests(): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request/declined`);
  }
 

  private baseUrl = `${environment.apiUrl}`

  constructor(private http: HttpClient) { }
  getAllTranactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`)
  }
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`)
  }

  getAccountById(accountId: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${this.baseUrl}/accounts/${accountId}`);
  }

  getTransactionsByUser(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions/user/${userId}`)
  }


  getAccountsByUser(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/user/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans`);
  }
  getAllLoansByUserId(userId: number): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans/user/${userId}`);
  }

  saveLoan(loan: Loan): Observable<any> {
    return this.http.post(`${this.baseUrl}/loans`, loan);
  }
  addAccountRequest(account: AccountRequest) {
    return this.http.post<Account>(`${this.baseUrl}/accounts/account-request`, account);
  }

  getEMI(loan: Loan) {
    return this.http.post<Loan>(`${this.baseUrl}/loans/openemi`, loan);
  }

  approveAccountRequest(accountRequestId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/accounts/account-request/approve/${accountRequestId}`, null)
  }
  declineAccountRequest(accountRequestId: number) {
    return this.http.put(`${this.baseUrl}/accounts/account-request/decline/${accountRequestId}`, null)
  }
  getAccountRequests(): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request`);

  }
  getAccountRequestsByUser(userId: number): Observable<AccountRequestDetails[]> {
    return this.http.get<AccountRequestDetails[]>(`${this.baseUrl}/accounts/account-request/user/${userId}`);
  }

  addAccount(account: AccountCreationRequest) {
    return this.http.post<Account>(`${this.baseUrl}/accounts`,account);
  }
  addTransaction(transaction:Transaction)
  {
    return this.http.post<Transaction>(`${this.baseUrl}/transactions`,transaction)
  }
 
  // performTransaction(transaction: Transaction): Observable<Transaction> {
  //   return this.http.post<Transaction>(`${this.baseUrl}/transactions`,transaction);
  // }
 
 
  // getOutstandingBalance(userId: string): Observable<number> {
  //   return this.http.get<number>(`${this.baseUrl}/out-standing?userId=${userId}`);
 
  // }
 
  // getTranactionsByUser(userId: string): Observable<Transaction[]> {
  //  return this.http.get<Transaction[]>(`${this.baseUrl}/transactions/${userId}`);
  // }

  getAccountByUserId(userId:number):Observable<Account[]>
  {    
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/user/${userId}`);
  }

  getDebitTransactionsByAccount(accountId: number): Observable<TransactionForAccount[]> {
    return this.http.get<TransactionForAccount[]>(`${this.baseUrl}/transactions/account/debit/${accountId}`);
  }

  getCreditTransactionsByAccount(accountId: number): Observable<TransactionForAccount[]> {
    return this.http.get<TransactionForAccount[]>(`${this.baseUrl}/transactions/account/credit/${accountId}`);
  }

  getTransactionsByAccount(accountId: number): Observable<TransactionForAccount[]> {
    return this.http.get<TransactionForAccount[]>(`${this.baseUrl}/transactions/account/${accountId}`);
  }
}
