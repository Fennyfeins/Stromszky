import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'isConfirmed';
  private apiUrlLogin = 'https://stromszky.de/api/login/';
  private apiUrlRegister = 'https://stromszky.de/api/register/';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(username: string, password: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.apiUrlLogin, { username, password });
  }

  logout(): void {
    this.resetIsUserConfirmed();
    //sessionStorage.removeItem('authToken');
  }

  register(data: { username: string; password: string; confirm_password: string }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(this.apiUrlRegister, data);
  }


  // StorageKey
  confirm(): void {
    sessionStorage.setItem(this.storageKey, 'true');
  }

  isUserConfirmed(): boolean {
    return sessionStorage.getItem(this.storageKey) === 'true';
  }

  resetIsUserConfirmed(): void {
    sessionStorage.setItem(this.storageKey, 'false');
    console.log('Benutzer wurde ausgeloggt.');
    this.router.navigate(['/login']);
  }
}
