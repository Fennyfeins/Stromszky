import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'isConfirmed';
  private apiUrlLogin = 'http://127.0.0.1:8000/api/login/';
  private apiUrlRegister = 'http://127.0.0.1:8000/api/register/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.apiUrlLogin, { username, password });
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
}
