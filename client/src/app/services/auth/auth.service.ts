import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/auth';

  // is user logged in
  private isUserLoggedIn: boolean = false;
  private subjectIsUserLoggedIn = new Subject<any>();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  isLoggedIn(): void {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }

    this.subjectIsUserLoggedIn.next(this.isUserLoggedIn);
  }
  
  checkIsLoggedIn(): Observable<any> {
    return this.subjectIsUserLoggedIn.asObservable();
  }

  // Get Login User
  getLoginUser(): Observable<any> {

    const token: any = localStorage.getItem("jwt");
    const response = this.jwtHelper.decodeToken(token);
    const userId = response.user.id;

    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': token
      })
    }

    return this.http.get<any>(this.apiUrl, httpOptions);
  }

  // Login User
  userAuthenaticationLogin(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials, httpOptions);
  }
  
  // Logout User
  userAuthenaticationLogout(): void {
    localStorage.removeItem("jwt");
    this.subjectIsUserLoggedIn.next(false);
  }

}
