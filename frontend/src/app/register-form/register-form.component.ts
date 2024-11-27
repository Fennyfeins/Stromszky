import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private dialogRef: MatDialogRef<RegisterFormComponent>) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwörter stimmen nicht überein.');
      return;
    }

    console.log('Benutzer registriert:', this.username);
    this.dialogRef.close();
  }
}
