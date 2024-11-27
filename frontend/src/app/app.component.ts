import { Component } from '@angular/core';
import { AuthService } from './auth.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private authService: AuthService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
  }
  
  logout(): void {
    this.authService.logout();
    console.log('Benutzer wurde ausgeloggt.');
    this.router.navigate(['/login']);
  }
}
