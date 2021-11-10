import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  getUserId (): any {
    const token: any = localStorage.getItem("jwt");
    const response = this.jwtHelper.decodeToken(token);
    return response.user.id;
  }

  userRegister(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newUser, httpOptions);
  }

  getAllUsers(): Observable<any> {

    const token: any = localStorage.getItem("jwt");
    const response = this.jwtHelper.decodeToken(token);
    const userId = response.user.id;

    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': token
      })
    }

    const url = this.apiUrl + '/all/' + userId;
    return this.http.get<any>(url, httpOptions);
  }

}
