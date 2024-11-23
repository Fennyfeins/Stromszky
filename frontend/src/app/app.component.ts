import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Customer } from './customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // $=Namenskonvention für Variablen mit Observer. 
  // !=Meldet dem Compiler dass die Variable erst später Initialisiert wird.
  customer$!: Observable<Customer>;

  constructor(private apiService: ApiService) {}

  callServiceFunktion(): Observable<Customer> {
    this.customer$ = this.apiService.getCustomer();
    return this.customer$;
  }

  ngOnInit(): void {
  }
}
