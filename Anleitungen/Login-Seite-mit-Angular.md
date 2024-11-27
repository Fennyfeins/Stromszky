
# Login-Seite mit Angular erstellen

## 1. Projektvorbereitung
1. **Angular-Projekt erstellen oder öffnen**  
   Falls noch nicht vorhanden, erstelle ein neues Angular-Projekt:  
   ```bash
   ng new angular-login-app
   cd angular-login-app
   ```

2. **Benötigte Pakete installieren**  
   Angular Material für das Styling:  
   ```bash
   ng add @angular/material
   ```

3. **Routing hinzufügen (falls nicht vorhanden)**  
   Stelle sicher, dass dein Projekt mit Routing eingerichtet ist. Falls nicht, kannst du es manuell hinzufügen:
   ```bash
   ng generate module app-routing --flat --module=app
   ```

---

## 2. Komponenten erstellen
Erstelle die Login-Komponente:  
```bash
ng generate component login
```

---

## 3. HTML-Layout für die Login-Seite
Bearbeite die Datei `login.component.html`:
```html
<div class="login-container">
  <mat-card>
    <mat-card-header>
      <mat-card-title>Login</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Password</mat-label>
          <input matInput formControlName="password" type="password" required>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">Login</button>
      </form>
    </mat-card-content>
  </mat-card>
</div>
```

---

## 4. Styles hinzufügen
Füge Styling in `login.component.scss` hinzu:
```scss
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

mat-card {
  width: 400px;
  padding: 20px;
}

button {
  width: 100%;
}
```

---

## 5. FormBuilder für das Formular
Bearbeite die `login.component.ts`:
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      // Weiterleitung oder API-Aufruf
    }
  }
}
```

---

## 6. Routing konfigurieren
Füge in `app-routing.module.ts` die Route für die Login-Seite hinzu:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

## 7. Module importieren
Stelle sicher, dass alle benötigten Angular-Module importiert sind:
Bearbeite `app.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## 8. Login-Logik erweitern
Du kannst die `onSubmit`-Methode anpassen, um die Eingaben an eine API zu senden:
```typescript
import { HttpClient } from '@angular/common/http';

constructor(private fb: FormBuilder, private http: HttpClient) { }

onSubmit() {
  if (this.loginForm.valid) {
    this.http.post('https://example.com/api/login', this.loginForm.value)
      .subscribe(response => {
        console.log('Login successful', response);
        // Weiterleitung oder Token-Speicherung
      }, error => {
        console.error('Login failed', error);
      });
  }
}
```

Vergiss nicht, das **HttpClientModule** in `app.module.ts` zu importieren:
```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    // Andere Module
    HttpClientModule
  ],
})
export class AppModule {}
```

---

## 9. Login testen
Starte den Entwicklungsserver:
```bash
ng serve
```
Öffne `http://localhost:4200/login`, um die Login-Seite zu sehen und zu testen.

---

## Optionale Erweiterungen
- **Validierungsfeedback anzeigen**: Nutze Angulars Form Validation, um Fehlermeldungen anzuzeigen.
- **AuthGuard hinzufügen**: Schütze andere Routen vor unbefugtem Zugriff.
- **JWT Token-Verarbeitung**: Speichere und überprüfe JWT-Tokens für die Authentifizierung.
