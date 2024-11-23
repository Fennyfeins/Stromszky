import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss'
})
export class CustomerSearchComponent implements OnInit{
  /* id: number = -1;
  firstname: string = '';
  surname: string = '';
  dateOfBirth: Date = new Date();
  phone: string = '';
  street: string = '';
  number: string = '';
  postalCode: string = '';
  city: string = '';
  iban: string = '';

  constructor(id: number, firstname: string, surname: string, dateOfBirth: Date, 
    phone: string, street: string, number: string, postalCode: string, city: string, 
    iban: string) {
      this.id = id;
      this.firstname = firstname;
      this.surname = surname;
      this.dateOfBirth = dateOfBirth;
      this.phone = phone;
      this.street = street;
      this.number = number;
      this.postalCode = postalCode;
      this.city = city;
      this.iban = iban;
  } */

  ngOnInit(): void {
  }
}
