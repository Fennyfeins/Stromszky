import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'isConfirmed';
  private apiUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient) {}

  // Funktioniert noch nicht!
  login(username: string, password: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.apiUrl, { username, password });
  }


  // Test des Dialogs unabhaengig von den Credentials
  confirm(): void {
    sessionStorage.setItem(this.storageKey, 'true');
  }

  isUserConfirmed(): boolean {
    return sessionStorage.getItem(this.storageKey) === 'true';
  }
}
