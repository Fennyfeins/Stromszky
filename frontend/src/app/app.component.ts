import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Customer } from './customer';
import { CustomerSearchComponent } from './customer-search/customer-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  customer: Customer = {
    id: -1, firstname: '', surname: '', dateOfBirth: new Date(), phone: '', street: '', number: '', postalCode: '', city: '', iban: '' 
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): Customer {
    this.apiService.getCustomer().subscribe(response => {
      this.customer.id = response.id;
      this.customer.firstname = response.firstname;
      this.customer.surname = response.surname;
      this.customer.dateOfBirth = response.dateOfBirth;
      this.customer.phone = response.phone;
      this.customer.street = response.street;
      this.customer.number = response.number;
      this.customer.postalCode = response.postalCode;
      this.customer.city = response.city;
      this.customer.iban = response.iban;
    });
    return this.customer;
  }
}
