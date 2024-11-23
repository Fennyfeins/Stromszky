import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  message: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTestMessage().subscribe(response => {
      this.message = response.message;
    });
  }
}
