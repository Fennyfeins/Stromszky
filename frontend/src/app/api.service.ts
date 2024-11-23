import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTestMessage(): Observable<any> {
    return this.http.get('http://localhost:8000/api/test/');
  }

  getCustomer(): Observable<any> {
    return this.http.get('http://localhost:8000/api/customer/');
  }
}
