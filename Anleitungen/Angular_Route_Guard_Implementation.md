
# Sicherstellung des Bestätigungsdialogs vor Zugriff auf die /table-Seite

## Ziel
Verhindern Sie, dass Benutzer direkt auf die `/table`-Seite zugreifen können, ohne zuvor den Dialog auf der Startseite zu bestätigen. Dies wird durch einen **Route Guard** und einen **Service zur Sitzungsverwaltung** erreicht.

---

## Schritte

### **1. AuthService erstellen**
Der AuthService speichert den Status der Bestätigung.

**Befehl im Terminal:**
```bash
ng generate service auth
```

**auth.service.ts**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isConfirmed = false;

  constructor() {}

  confirm(): void {
    this.isConfirmed = true;
  }

  isUserConfirmed(): boolean {
    return this.isConfirmed;
  }
}
```

---

### **2. ConfirmDialogComponent anpassen**
Der Bestätigungsstatus wird im AuthService gespeichert.

**confirm-dialog.component.ts**
```typescript
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private authService: AuthService
  ) {}

  onConfirm(): void {
    this.authService.confirm();
    this.dialogRef.close(true);
  }
}
```

---

### **3. Route Guard erstellen**
Der Guard überprüft, ob der Benutzer bestätigt hat.

**Befehl im Terminal:**
```bash
ng generate guard auth
```
Folgende Optionen stehen zur Auswahl:
Was bedeuten die Optionen?
Hier ist eine kurze Erklärung der zur Auswahl stehenden Guard-Typen:

- **CanActivate**:
Beschreibung: Entscheidet, ob eine Route aktiviert werden darf.
Verwendung: Wird verwendet, um den Zugriff auf bestimmte Routen zu kontrollieren, bevor sie geladen werden.
Anwendungsfall: Sie möchten verhindern, dass Benutzer ohne Berechtigung auf eine Seite zugreifen.

- **CanActivateChild**:
Beschreibung: Entscheidet, ob Kindrouten aktiviert werden dürfen.
Verwendung: Wird auf Routen mit Kindrouten angewendet, um den Zugriff auf die untergeordneten Routen zu kontrollieren.
Anwendungsfall: Sie haben eine Elternroute mit mehreren Kindrouten und möchten den Zugriff auf die Kindrouten einschränken.

- **CanDeactivate**:
Beschreibung: Entscheidet, ob eine Route verlassen werden darf.
Verwendung: Wird verwendet, um Benutzer daran zu hindern, eine Seite zu verlassen, z. B. wenn ungespeicherte Änderungen vorhanden sind.
Anwendungsfall: Sie möchten den Benutzer warnen, bevor er eine Seite mit ungespeicherten Daten verlässt.

- **CanMatch**:
Beschreibung: Ermöglicht benutzerdefinierte Übereinstimmungslogik für Routen.
Verwendung: Wird verwendet, um komplexe Routing-Entscheidungen basierend auf benutzerdefinierten Bedingungen zu treffen.
Anwendungsfall: Sie benötigen eine spezielle Logik, um zu entscheiden, ob eine Route mit einer URL übereinstimmt.



**auth.guard.ts**
```typescript
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})


export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isUserConfirmed()) {
      return true;
    } else {
      return this.router.createUrlTree(['/']);
    }
  }
}

```

---

### **4. Routing anpassen**
Der Route Guard wird auf die `/table`-Route angewendet.

**app-routing.module.ts**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
import { TableComponent } from './table/table.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: DialogPageComponent },
  {
    path: 'table',
    component: TableComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

### **5. DialogPage anpassen**
Nach Bestätigung navigiert der Benutzer zur `/table`-Seite.

**dialog-page.component.ts**
```typescript
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dialog-page',
  template: '',
})
export class DialogPageComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/table']);
      }
    });
  }
}
```

---

### **6. Sitzungsverwaltung über Seitenneuladen hinweg**
Um den Status auch nach Neuladen der Seite zu behalten, verwenden Sie `sessionStorage`.

**auth.service.ts**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'isConfirmed';

  constructor() {}

  confirm(): void {
    sessionStorage.setItem(this.storageKey, 'true');
  }

  isUserConfirmed(): boolean {
    return sessionStorage.getItem(this.storageKey) === 'true';
  }
}
```

---

## Anwendung testen
- Starten Sie die Angular-App:
  ```bash
  ng serve
  ```

- Versuchen Sie, direkt zu `/table` zu navigieren:
  - Ohne Bestätigung: Sie werden zur Startseite umgeleitet.
  - Nach Bestätigung: Sie haben Zugriff auf die Tabelle.

---

## Sicherheitshinweis
Diese Lösung schützt die Route auf Frontend-Ebene, ist aber nicht vollständig sicher. Für sicherheitskritische Anwendungen sollten auch serverseitige Validierungen implementiert werden.

---

## Zusammenfassung
Durch die Kombination eines Route Guards und eines AuthServices wird sichergestellt, dass Benutzer den Dialog bestätigen müssen, bevor sie auf die `/table`-Seite zugreifen können. Diese Methode bietet eine zuverlässige Lösung für den Zugriffsschutz in Angular-Apps.
