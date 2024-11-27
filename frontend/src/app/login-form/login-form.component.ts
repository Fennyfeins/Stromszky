import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
password: any;
username: any;
  constructor(
    private dialogRef: MatDialogRef<LoginFormComponent>,
    private authService: AuthService,
    private router: Router) { }

    onSubmit(): void {
      /* this.authService.login(this.username, this.password).subscribe(
        (response) => {
          if (response.success) {
            this.dialogRef.close(true);
            this.router.navigate(['/table']);
          } else {
            alert('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
          }
        },
        (error) => {
          alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
          console.error(error);
        }
      ); */

      this.authService.confirm(); // Markiere den Benutzer als "eingeloggt"

      // Überprüfe, ob der Benutzer erfolgreich bestätigt wurde
      if (this.authService.isUserConfirmed()) {
        this.dialogRef.close(true); // Schließe den Dialog
        this.router.navigate(['/table']); // Navigiere zur Tabelle
      } else {
        alert('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
      }
    }
}
