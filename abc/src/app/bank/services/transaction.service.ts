
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "../types/transaction";
import { Observable } from "rxjs";
import { Account } from "../types/account";
 
@Injectable({
  providedIn: "root",
})
export class TransactionService {
 
 
  // private baseUrl = `${environment.apiUrl}`;
  private baseUrl = `https://ec2-3-110-172-193_5000.projects.wecreateproblems.com`;
 
  constructor(private http: HttpClient) {}
 
  addAccount(account: Account) {
    return this.http.post<Account>(`${this.baseUrl}/accounts`,account);
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
}
 