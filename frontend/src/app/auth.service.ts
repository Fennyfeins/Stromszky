import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'isConfirmed';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>('/api/login', { username, password });
  }


  confirm(): void {
    sessionStorage.setItem(this.storageKey, 'true');
  }

  isUserConfirmed(): boolean {
    return sessionStorage.getItem(this.storageKey) === 'true';
  }
}
