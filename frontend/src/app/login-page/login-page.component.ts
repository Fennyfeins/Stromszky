import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{
  constructor(private dialog: MatDialog, private router: Router) {}
  
  ngOnInit(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/table']);
      } else {
        console.log('Login abgebrochen.');
      }
    });
  }

}
