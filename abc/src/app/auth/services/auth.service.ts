import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { map, Observable } from "rxjs";
import { User } from "../types/user";
 
@Injectable({
  providedIn: "root",
})
export class AuthService {
   private loginUrl = `${environment.apiUrl}`;
  //private loginUrl = `https://ec2-3-110-62-23_5000.projects.wecreateproblems.com`;

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
  };
 
  constructor(private http: HttpClient) {}
 
  login(user: User): Observable<any> {
    // console.log(this.loginUrl);
    return this.http.post(`${this.loginUrl}/login`, user, this.httpOptions);
  }
 
  getToken() {
    console.log(localStorage.getItem("token"));
    return localStorage.getItem("token");
  }
 
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.loginUrl}/fetchusers`);
  // }
 
  createUser(user: User): Observable<User> {
    // @todo : should create a user in the system at the endpoint "/user"
    return this.http.post<User>(`${this.loginUrl}/sign-up`, user);
  }
}
 