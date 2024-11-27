import { Component } from '@angular/core';
import { AuthService } from './auth.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isConfirmed: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isConfirmed = this.authService.isUserConfirmed();
  }
  
  logout(): void {
    this.authService.logout();
    this.isConfirmed = false; 
    console.log('Benutzer wurde ausgeloggt.');
    this.router.navigate(['/login']);
  }
}
