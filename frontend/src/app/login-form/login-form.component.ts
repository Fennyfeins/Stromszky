import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  constructor(
    private dialogRef: MatDialogRef<LoginFormComponent>,
    private authService: AuthService) { }

  onConfirm(): void {
    this.authService.confirm();
    this.dialogRef.close(true);
  }
}
