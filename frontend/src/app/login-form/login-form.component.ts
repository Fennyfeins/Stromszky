import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  constructor(private dialogRef: MatDialogRef<LoginFormComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
