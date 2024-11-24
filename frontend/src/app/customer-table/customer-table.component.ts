import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Customer } from '../customer';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss'
})
export class CustomerTableComponent {
  customerList!: Customer[];
  dataSource:any;
  displayedColumns:string[]=['id','firstname','surname','dateOfBirth','phone','street','number','postalCode','city','iban'];
  
  constructor(private ApiService: ApiService) {
    this.ApiService.getAllCustomers().subscribe(response=> {
      this.customerList = response;
      this.dataSource = new MatTableDataSource<Customer>(this.customerList);
    })
  }
}
