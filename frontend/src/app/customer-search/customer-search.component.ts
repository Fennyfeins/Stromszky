import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss'
})
export class CustomerSearchComponent implements OnInit{
  id: number;
  firstname: string;
  surname: string;
  dateOfBirth: Date;
  phone: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  iban: string;

  constructor() {
      this.id = -1;
      this.firstname = '';
      this.surname = '';
      this.dateOfBirth = new Date();
      this.phone = '';
      this.street = '';
      this.number = '';
      this.postalCode = '';
      this.city = '';
      this.iban = '';
  }

  ngOnInit(): void {
  }
}
