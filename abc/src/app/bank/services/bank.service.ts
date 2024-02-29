import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../types/transaction';
import { Account } from "../types/account";
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../../auth/types/user';
import { AccountDetails } from '../types/AccountDetails';
import { TransactionForAccount } from '../types/TransactionForAccount';
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

  getTransactionsByUser(strUserId: string | null): Observable<Transaction[]> {
  return this.http.get<Transaction[]>(`${this.baseUrl}/transaction/customer/${strUserId}`)
  }
 

  getAccountsByUser(strUserId: string | null): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/user/${strUserId}`);
  }
  
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
  

}
