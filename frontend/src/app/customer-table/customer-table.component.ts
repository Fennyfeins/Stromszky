import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Customer } from '../customer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss'
})
export class CustomerTableComponent {
  // Definiert eine Variable für die Kundenliste, die vom API zurückgegeben wird
  customerList!: Customer[];

  // Datenquelle für die Tabelle (Material Table erwartet ein MatTableDataSource-Objekt)
  dataSource: any;

  // Spalten, die in der Tabelle angezeigt werden sollen, basierend auf den Feldnamen im Customer-Modell
  displayedColumns: string[] = [
    'id',           
    'firstname',    
    'surname',      
    'dateOfBirth',  
    'phone',        
    'street',       
    'number',       
    'postalCode',   
    'city',         
    'iban',         
    'edit'          
  ];

  // Zugriff auf den MatPaginator, um die Pagination der Tabelle zu steuern
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Zugriff auf den MatSort, um die Sortierung der Tabelle zu steuern
  @ViewChild(MatSort) sort!: MatSort;

  // Konstruktor wird beim Erstellen der Komponente aufgerufen
  constructor(private ApiService: ApiService) {

    // API-Aufruf, um alle Kunden zu laden
    this.ApiService.getAllCustomers().subscribe(response => {
      // Die vom API zurückgegebene Kundenliste wird in die lokale Variable gespeichert
      this.customerList = response;

      // Die Datenquelle für die Tabelle wird mit den Kundendaten initialisiert
      this.dataSource = new MatTableDataSource<Customer>(this.customerList);

      // Der Paginator wird mit der Datenquelle verknüpft, um die Pagination zu ermöglichen
      this.dataSource.paginator = this.paginator;
      // Sort wird mit der Datenquelle verknüpft, um die Sortierung zu ermöglichen
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
}
