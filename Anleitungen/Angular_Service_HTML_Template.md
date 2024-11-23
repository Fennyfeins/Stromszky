
# Angular: Service-Funktion im HTML-Template verwenden

In Angular kannst du eine Funktion, die in einem Service definiert ist, innerhalb eines HTML-Templates nutzen. Dies erfordert, dass der Service Daten asynchron bereitstellt und das Template diese korrekt verarbeitet.

---

## Schritte zur Lösung

### 1. Service-Methode definieren

Der Service stellt die Funktion bereit, um Daten von der API zu holen. Er gibt ein **Observable** zurück, das die Daten enthält:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/customer/';

  constructor(private http: HttpClient) {}

  // API-Aufruf
  getCustomer(): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl);
  }
}
```

---

### 2. Methode in der Komponente aufrufen

In der Komponente wird der Service verwendet. Die Methode `callServiceFunktion` speichert das Ergebnis des HTTP-Aufrufs (ein Observable) in einer Variablen. Diese Variable (`customer$`) kann im Template verwendet werden:

```typescript
import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Observable, das die Kundendaten enthält
  customer$!: Observable<Customer>;

  constructor(private apiService: ApiService) {}

  // Funktion, die den Service aufruft und das Observable speichert
  callServiceFunktion(): void {
    this.customer$ = this.apiService.getCustomer();
  }
}
```

---

### 3. Observable im Template anzeigen

Um das Observable im Template zu verwenden, nutzen wir die **`async`-Pipe** von Angular. Diese Pipe:
- **Abonniert** das Observable automatisch.
- Wartet auf die Daten und aktualisiert das Template, sobald die Daten ankommen.

Das Template könnte so aussehen:

```html
<h1>Angular Frontend</h1>
<div>
    <!-- Button, um die Funktion aufzurufen -->
    <button (click)="callServiceFunktion()">Daten laden</button>

    <!-- Kundendaten anzeigen, wenn sie verfügbar sind -->
    <ng-container *ngIf="customer$ | async as customer">
        <p>ID: {{ customer.id }}</p>
        <p>Vorname: {{ customer.firstname }}</p>
        <p>Nachname: {{ customer.surname }}</p>
        <p>Geburtsdatum: {{ customer.dateOfBirth }}</p>
        <p>Telefon: {{ customer.phone }}</p>
        <p>Straße: {{ customer.street }}</p>
        <p>Hausnummer: {{ customer.number }}</p>
        <p>PLZ: {{ customer.postalCode }}</p>
        <p>Stadt: {{ customer.city }}</p>
        <p>IBAN: {{ customer.iban }}</p>
    </ng-container>
</div>
```

---

## Detaillierte Erklärung

### 1. `callServiceFunktion` in der Komponente

- Diese Funktion ruft die Methode `getCustomer` des Services auf.
- Sie speichert das zurückgegebene Observable in `customer$`.

### 2. `customer$` im Template

- Die `customer$`-Variable enthält das Observable.
- Im Template wird mit der **`async`-Pipe** gearbeitet, die:
  - Das Observable abonniert.
  - Automatisch die Daten extrahiert, sobald sie verfügbar sind.
  - Das Template aktualisiert.

### 3. `ngIf` zur Anzeige der Daten

- Der Ausdruck `*ngIf="customer$ | async as customer"` überprüft, ob Daten vorhanden sind.
- Die Variable `customer` ist verfügbar, sobald die Daten geladen sind.

---

## Warum funktioniert das so?

### Asynchroner Datenfluss
HTTP-Aufrufe geben keine direkten Werte zurück, sondern Observables, die später Werte liefern. Mit der `async`-Pipe wird dieses asynchrone Verhalten einfach in das Template integriert.

### Vorteil der `async`-Pipe
- Kein manuelles Abonnieren in der Komponente erforderlich.
- Automatische Handhabung des Lebenszyklus von Subscriptions.
- Das Template bleibt lesbar und sauber.

---

## Zusammenfassung

- Die Service-Methode liefert ein Observable.
- Die Komponente speichert das Observable in einer Variable (`customer$`).
- Im Template wird die `async`-Pipe verwendet, um das Observable aufzulösen und die Daten anzuzeigen.
- Die Verwendung von `ngIf` sorgt dafür, dass die Daten erst angezeigt werden, wenn sie verfügbar sind.
