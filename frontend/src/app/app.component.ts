import { Component } from '@angular/core';
import { AuthService } from './auth.service.js';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
     // Überprüfe den Status beim Start der App
     this.updateButtonStatus();

     // Aktualisiere den Status bei jeder Navigation
     this.router.events
       .pipe(filter(event => event instanceof NavigationEnd))
       .subscribe(() => {
         this.updateButtonStatus();
       });
  }
  
  logout(): void {
    this.authService.logout();
    this.updateButtonStatus(); 
    console.log('Benutzer wurde ausgeloggt.');
    this.router.navigate(['/login']);
  }

  private updateButtonStatus(): void {
    this.isConfirmed = this.authService.isUserConfirmed();
  }
}
