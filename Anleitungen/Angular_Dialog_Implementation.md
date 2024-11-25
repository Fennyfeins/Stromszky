
# Anleitung zur Implementierung eines Bestätigungsdialogs in Angular

## Ziel
Implementieren Sie eine Startseite mit einem Bestätigungsdialog, der mit "OK" bestätigt werden muss, bevor der Benutzer zur `table-component` weitergeleitet wird.

---

## Voraussetzungen
- **Angular CLI:** 18.2.12
- **Node.js:** 20.18.0
- **npm:** 10.8.2
- **Angular Material:** Muss installiert werden

---

## Schritte

### 1. Routing in der Angular-App einrichten
- Stellen Sie sicher, dass die Datei `app-routing.module.ts` existiert.
- Importieren Sie das `AppRoutingModule` in Ihre `app.module.ts`.

### 2. Neue Komponente für die Dialogseite erstellen
```bash
ng generate component DialogPage
```

### 3. Angular Material installieren
```bash
ng add @angular/material
```

### 4. Benötigte Module importieren
Fügen Sie in Ihrer `app.module.ts` die folgenden Importe hinzu:
```typescript
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatDialogModule,
    BrowserAnimationsModule,
    // weitere Module...
  ],
})
export class AppModule {}
```

### 5. Dialog-Komponente erstellen
Generieren Sie eine Komponente für den Dialoginhalt:
```bash
ng generate component ConfirmDialog
```

### 6. Dialog-Inhalt gestalten
- **confirm-dialog.component.html**
```html
<h1 mat-dialog-title>Bestätigung</h1>
<div mat-dialog-content>
  <p>Bitte bestätigen Sie, um zur Kundendaten-Tabelle zu gelangen.</p>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onConfirm()">OK</button>
</div>
```

- **confirm-dialog.component.ts**
```typescript
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
```

### 7. Dialog in der DialogPage-Komponente öffnen
- **dialog-page.component.ts**
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

### 8. Routing-Konfiguration anpassen
- **app-routing.module.ts**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', component: DialogPageComponent },
  { path: 'table', component: TableComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### 9. Hauptvorlage anpassen
- **app.component.html**
```html
<router-outlet></router-outlet>
```

### 10. Anwendung testen
Starten Sie die Angular-App:
```bash
ng serve
```

---

## Zusammenfassung
Nach dem Implementieren der oben genannten Schritte sehen Benutzer beim Start der Web-App einen Bestätigungsdialog. Nach der Bestätigung gelangen sie zur Tabelle mit den Kundendaten.

---

**Hinweis:** Für weiteres Styling oder alternative Implementierungen können Sie Angular Material Themes oder benutzerdefinierte CSS verwenden.
