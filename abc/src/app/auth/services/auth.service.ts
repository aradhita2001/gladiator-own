import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";
import { User } from "../types/user";
import { LoginResponse } from "../types/login-response";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private loginUrl = `${environment.apiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.loginUrl}/sign-up`, user);
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.loginUrl}/login`, user, this.httpOptions);
  }

  logout(){
    localStorage.clear();
    console.log("hello");
  }

  saveUserInfo(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('role', loginResponse.role);
    localStorage.setItem('userId', loginResponse.userId.toString());
  }

  getUserInfo(): LoginResponse {

    let role: string | null = localStorage.getItem('role');
    let token: string | null = localStorage.getItem('token');
    let userId: string | null = localStorage.getItem('userId');

    let userInfo: LoginResponse = new LoginResponse(null);

    userInfo.role = !!role ? role : "";
    userInfo.token = !!token ? token : "";
    userInfo.userId = Number(!!userId ? userId : "");

    return userInfo;
  }

  /**
   * 
   * @returns true if proper user details are stored in localstorage else false
   */

  validateLogin(): boolean {
    //role must be USER or ADMIN
    // token and userId must be preent
    if (!(localStorage.getItem('role') == 'ADMIN' || localStorage.getItem('role') == 'USER')) return false;
    return !!localStorage.getItem('token') && !!localStorage.getItem('userId');
  }

  checkRole(role: string): boolean {
    return localStorage.getItem('role') === role;
  }

  getUserId(): number {
    let userId: string | null = localStorage.getItem('userId');
    return Number(!!userId ? userId : "");
  }

  getRole(): String {
    let role: string | null = localStorage.getItem('role');
    return !!role ? role : "";
  }

  getToken() {
    let token: string | null = localStorage.getItem('token');
    return !!token ? token : "";
  }
}
