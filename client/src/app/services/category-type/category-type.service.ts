import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryTypeService {
  private apiUrl = 'api/category-type';

  constructor(
    private http: HttpClient
  ) { }

  getCategoryTypes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
