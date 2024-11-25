import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'isConfirmed';

  constructor() {}

  confirm(): void {
    sessionStorage.setItem(this.storageKey, 'true');
  }

  isUserConfirmed(): boolean {
    return sessionStorage.getItem(this.storageKey) === 'true';
  }
}
