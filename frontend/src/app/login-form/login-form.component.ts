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
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Login erfolgreich');
            this.router.navigate(['/table']);
          } else {
            console.log('Login fehlgeschlagen');
          }
        },
        error: (error) => {
          console.error('Ein Fehler ist aufgetreten:', error);
        },
        complete: () => {
          console.log('Anfrage abgeschlossen');
        }
      });

      // Test des Dialogs unabhaengig von den Credentials
      /* this.authService.confirm();

      if (this.authService.isUserConfirmed()) {
        this.dialogRef.close(true);
        this.router.navigate(['/table']);
      } else {
        alert('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
      } */
    }
}
