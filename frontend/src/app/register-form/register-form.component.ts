import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private dialogRef: MatDialogRef<RegisterFormComponent>, 
    private authService: AuthService,) {}

  onRegister(): void {
    const registerData = {
      username: this.username,
      password: this.password,
      confirm_password: this.confirmPassword,
    };
  
    this.authService.register(registerData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Registrierung erfolgreich:', response.message);
          this.dialogRef.close();
        } else {
          alert('Registrierung fehlgeschlagen: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Ein Fehler ist aufgetreten:', error);
      },
    });
  }

  /* onRegister(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwörter stimmen nicht überein.');
      return;
    }

    console.log('Benutzer registriert:', this.username);
    this.dialogRef.close();
  } */
}
