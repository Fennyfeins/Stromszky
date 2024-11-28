import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Customer } from '../customer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss'
})
export class CustomerSearchComponent implements OnInit{

  // $=Namenskonvention für Variablen mit Observer. 
  // !=Meldet dem Compiler dass die Variable erst später Initialisiert wird.
  //customer$!: Observable<Customer>;

  constructor() {}

  ngOnInit(): void {
  }
}
