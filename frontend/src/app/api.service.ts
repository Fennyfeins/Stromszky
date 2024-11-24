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
  private apiUrlSingleCustomer = 'http://localhost:8000/api/singleCustomer/';
  private apiUrlAllCustomers = 'http://localhost:8000/api/allCustomers/';
  private apiUrlSetCustomer = 'http://localhost:8000/api/postCustomer/';

  private apiUrl = 'http://localhost:8000/api/customers/';

  constructor(private http: HttpClient) {
  }

  getTestMessage(): Observable<any> {
    return this.http.get(this.apiUrlTest);
  }

  //TODO
  getCustomer(code:number): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrlSingleCustomer+code);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrlAllCustomers);
  }

  //TODO
  postCustomer(data:any) {
    return this.http.post(this.apiUrlSingleCustomer, data);
  }



  
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
}
