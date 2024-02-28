import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../types/transaction';
import { Account } from "../types/account";
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
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
  getTransactionsByUser(strUserId: string | null): Observable<Transaction[]> {
  return this.http.get<Transaction[]>(`${this.baseUrl}/transaction/customer/${strUserId}`)
  }
 

  getAccountsByUser(strUserId: string | null): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/user/${strUserId}`);
  }
  

}
