import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Interface für die Datenstruktur
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlTest = 'http://localhost:8000/api/test/';
  private apiUrlCustomer = 'http://localhost:8000/api/singleCustomer/';

  constructor(private http: HttpClient) {
  }

  getTestMessage(): Observable<any> {
    return this.http.get(this.apiUrlTest);
  }

  getCustomer(): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrlCustomer);
  }
}
