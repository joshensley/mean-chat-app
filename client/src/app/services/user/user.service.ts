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
export class UserService {
  private apiUrl = 'api/users';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  userRegister(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newUser, httpOptions);
  }

}
