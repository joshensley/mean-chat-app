import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl = 'api/conversation';

  constructor(private http: HttpClient) { }

  getConversation(loginUserId: any, otherUserId: any): Observable<any> {

    const token: any = localStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': token
      })
    }

    const url = this.apiUrl + `/${loginUserId}/${otherUserId}` + `?limit=20`;
    return this.http.get<any>(url, httpOptions);
  }

  postMessage(textMessage: any): Observable<any> {
    const token: any = localStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': token,
        'Content-Type': 'application/json'
      })
    }

    return this.http.post<any>(this.apiUrl, textMessage, httpOptions);
  }
}
