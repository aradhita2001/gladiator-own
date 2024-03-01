
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "../types/transaction";
import { Observable } from "rxjs";
import { Account } from "../types/account";
import { getLocaleCurrencySymbol } from "@angular/common";
import { TransactionForAccount } from "../types/TransactionForAccount";
import { AccountCreationRequest } from "../types/AccountCreationRequest";
 
@Injectable({
  providedIn: "root",
})
export class TransactionService {
  getTransactionsByAccount(accountId: number): Observable<TransactionForAccount[]> {
    return this.http.get<TransactionForAccount[]>(`${this.baseUrl}/transactions/account/${accountId}`);
  }
 
  private baseUrl = `${environment.apiUrl}`;
 
  constructor(private http: HttpClient) {}
 
  addAccount(account: AccountCreationRequest) {
    return this.http.post<Account>(`${this.baseUrl}/accounts`,account);
  }
  addTransaction(transaction:Transaction)
  {
    return this.http.post<Transaction>(`${this.baseUrl}/transactions`,transaction)
  }
 
  performTransaction(transaction: Transaction): Observable<Transaction> {
    // @todo : should make an API call to /transaction and perform the transaction
    return this.http.post<Transaction>(`${this.baseUrl}/transactions`,transaction);
  }
 
 
  getOutstandingBalance(userId: string): Observable<number> {
    //@todo: Call the endpoint /out-standing?userId=${userId} to get the outstanding balance for a user with given userId
    return this.http.get<number>(`${this.baseUrl}/out-standing?userId=${userId}`);
 
  }
 
  getTranactionsByUser(userId: string): Observable<Transaction[]> {
   //@todo: Call the endpoint /all-transactions?userId=${userId} to get list of all transaction performed by user with given userId
   return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`);
  }

  getAccountByUserId(userId:number):Observable<Account[]>
  {    
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/user/${userId}`);
  }
}
 