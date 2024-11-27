
# Implementierung einer Login-Seite mit JWT-Authentifizierung in Angular und Django

## Ziel
Die bestehende Dialog-Seite soll in eine Login-Seite umgewandelt werden. Benutzer müssen sich anmelden, um Zugriff auf die Tabelle zu erhalten. Die Benutzerdaten werden in Django Admin gepflegt, und die Authentifizierung erfolgt über JWT.

---

## **Teil 1: Backend-Konfiguration (Django REST Framework)**

### **1.1 Installation von Django REST Framework Simple JWT**

```bash
pip install djangorestframework-simplejwt
```

### **1.2 Einstellungen in `settings.py` anpassen**

```python
INSTALLED_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
```

### **1.3 URLs konfigurieren**

```python
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
```

### **1.4 Schutz der API-Endpunkte**

Beispiel für einen geschützten ViewSet:

```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Customer
from .serializers import CustomerSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
```

---

## **Teil 2: Frontend-Konfiguration (Angular)**

### **2.1 Erstellen der Login-Komponente**

```bash
ng generate component login
```

### **2.2 Implementieren des Authentifizierungsservices**

```bash
ng generate service auth
```

**auth.service.ts**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'access_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<any>('http://localhost:8000/api/token/', { username, password })
      .subscribe((response) => {
        this.setToken(response.access);
        this.router.navigate(['/table']);
      });
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
```

### **2.3 HTTP Interceptor hinzufügen**

```bash
ng generate service auth-interceptor
```

**auth-interceptor.service.ts**

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
```

**In `app.module.ts` registrieren:**

```typescript
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },
],
```

### **2.4 Login-Komponente implementieren**

**login.component.html**

```html
<div class="login-container">
  <h2>Login</h2>
  <form (submit)="onSubmit()">
    <mat-form-field appearance="fill">
      <mat-label>Benutzername</mat-label>
      <input matInput [(ngModel)]="username" name="username" required />
    </mat-form-field>
    <mat-form-field appearance="fill">
      <mat-label>Passwort</mat-label>
      <input matInput [(ngModel)]="password" name="password" type="password" required />
    </mat-form-field>
    <button mat-raised-button color="primary" type="submit">Login</button>
  </form>
</div>
```

**login.component.ts**

```typescript
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password);
  }
}
```

---

### **2.5 Routing anpassen**

**app-routing.module.ts**

```typescript
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'table',
    component: TableComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];
```

---

### **2.6 AuthGuard anpassen**

**auth.guard.ts**

```typescript
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
```

---

### **2.7 HTTPClientModule und Angular Material Module importieren**

**app.module.ts**

```typescript
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AppModule {}
```

---

## **Teil 3: Anwendung testen**

1. **Starten Sie das Backend**:

   ```bash
   python manage.py runserver
   ```

2. **Starten Sie das Frontend**:

   ```bash
   ng serve
   ```

3. **Testen Sie den Login**:
   - Navigieren Sie zu `http://localhost:4200/login`.
   - Melden Sie sich mit einem Django-Benutzer an.
   - Nach erfolgreichem Login werden Sie zur Tabelle weitergeleitet.

---

## **Zusätzliche Hinweise**

- **CORS-Probleme beheben**: Installieren Sie `django-cors-headers`.
- **Sicherheitsaspekte**:
  - Verwenden Sie `localStorage` nur in Entwicklungsumgebungen.
  - Nutzen Sie HTTPS in Produktionsumgebungen.

---

## **Zusammenfassung**

Mit dieser Anleitung haben Sie eine Login-Seite in Angular implementiert, die JWT-Authentifizierung nutzt. Benutzer können sich anmelden und nur mit einer gültigen Authentifizierung auf geschützte Seiten zugreifen.
