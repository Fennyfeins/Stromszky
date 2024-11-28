import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  password: any;
  username: any;

  constructor(
    private dialogRef: MatDialogRef<LoginFormComponent>,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Login erfolgreich');
          this.authService.confirm()
          this.router.navigate(['/table']);
          this.dialogRef.close(true);
        } else {
          console.log('Login fehlgeschlagen');
        }
      },
      error: (error) => {
        console.error('Ein Fehler ist aufgetreten:', error);
        alert('Ein Fehler ist aufgetreten');
      },
      complete: () => {
        console.log('Anfrage abgeschlossen');
      }
    });
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterFormComponent, {
      width: '400px',
      disableClose: false
    });
  }
}
