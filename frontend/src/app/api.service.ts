import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Interface für die Datenstruktur
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/api/customers/';

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  // Testen
  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Customer>(url);
  }

  // Testen
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put<Customer>(url, customer);
  }

  // Testen
  deleteCustomer(id: number): Observable<void> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<void>(url);
  }
}
