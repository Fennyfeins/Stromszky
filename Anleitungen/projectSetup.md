# Anleitung zur Entwicklung einer Webanwendung mit Django und Angular unter Verwendung von WSL 2 und Docker

Diese Anleitung führt dich durch die Einrichtung eines Projekts mit Django und Angular unter Verwendung von VS Code auf Windows 11 mit WSL 2 (Ubuntu 22.04.5). Wir werden Django so konfigurieren, dass es mit MariaDB arbeitet, und am Ende das gesamte Projekt in einem Docker-Image bereitstellen.

## Voraussetzungen

- **Windows 11** mit installiertem **WSL 2** und **Ubuntu 22.04.5**
- **Visual Studio Code** mit den Erweiterungen:
  - **Remote - WSL**
  - **Docker**
- **Docker Desktop** für Windows (mit WSL 2-Backend)

---

## Inhaltsverzeichnis

1. [Einrichtung der Entwicklungsumgebung](#1-einrichtung-der-entwicklungsumgebung)
2. [Erstellen und Konfigurieren der Python-virtuellen Umgebung](#2-erstellen-und-konfigurieren-der-python-virtuellen-umgebung)
3. [Installation und Konfiguration von MariaDB](#3-installation-und-konfiguration-von-mariadb)
4. [Erstellen des Django-Projekts](#4-erstellen-des-django-projekts)
5. [Konfigurieren von Django zur Verwendung von MariaDB](#5-konfigurieren-von-django-zur-verwendung-von-mariadb)
6. [Erstellen des Angular-Projekts](#6-erstellen-des-angular-projekts)
7. [Integration von Angular und Django](#7-integration-von-angular-und-django)
8. [Erstellen von Docker-Images für das Projekt](#8-erstellen-von-docker-images-für-das-projekt)
9. [Zusammenfassung](#9-zusammenfassung)
10. [Zusätzliche Hinweise](#10-zusätzliche-hinweise)

---

## 1. Einrichtung der Entwicklungsumgebung

### 1.1. WSL 2 und Ubuntu einrichten

Stelle sicher, dass WSL 2 und Ubuntu 22.04.5 auf deinem Windows 11-System installiert sind.

- **WSL 2 Installation:** Falls nicht bereits geschehen, installiere WSL 2 gemäß der offiziellen Microsoft-Anleitung: [Installieren von WSL auf Windows 10 oder Windows 11](https://docs.microsoft.com/de-de/windows/wsl/install)

- **Ubuntu 22.04.5 Installation:** Installiere Ubuntu aus dem Microsoft Store.

### 1.2. Visual Studio Code konfigurieren

- **Remote - WSL Erweiterung:** Installiere die **Remote - WSL** Erweiterung in VS Code, um direkt in der WSL-Umgebung arbeiten zu können.

- **VS Code in WSL starten:**

  Öffne ein WSL-Terminal und navigiere zu deinem Home-Verzeichnis:

  ```bash
  cd ~
  ```

  Starte VS Code von der WSL-Shell aus:

  ```bash
  code .
  ```

---

## 2. Erstellen und Konfigurieren der Python-virtuellen Umgebung

### 2.1. Python und Pip überprüfen

Stelle sicher, dass Python 3 und Pip installiert sind:

```bash
python3 --version
pip3 --version
```

Falls nicht installiert, kannst du Python 3 installieren:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

### 2.2. Projektverzeichnis erstellen

Erstelle ein neues Verzeichnis für dein Projekt und wechsle in dieses:

```bash
mkdir ~/myproject
cd ~/myproject
```

### 2.3. Backendverzeichnis und Virtuelle Umgebung erstellen

Erstelle ein Verzeichnis für das Backend und eine virtuelle Umgebung namens `venv`:

```bash
mkdir backend
cd backend
python3 -m venv venv
```

### 2.4. Virtuelle Umgebung aktivieren

Aktiviere die virtuelle Umgebung:

```bash
source venv/bin/activate
```

Du solltest nun `(venv)` vor deiner Terminal-Eingabeaufforderung sehen.

---

## 3. Installation und Konfiguration von MariaDB

### 3.1. MariaDB installieren

Installiere MariaDB-Server und -Client:

```bash
sudo apt update
sudo apt install mariadb-server mariadb-client
```

### 3.2. MariaDB-Dienst starten

Starte den MariaDB-Dienst:

```bash
sudo service mariadb start
```

### 3.3. MariaDB sichern

Führe das Sicherheits-Skript aus, um MariaDB zu konfigurieren:

```bash
sudo mysql_secure_installation
```

Folge den Anweisungen:

- Lege ein Root-Passwort fest.
- Entferne anonyme Benutzer.
- Verbiete Root-Login von extern.
- Entferne die Test-Datenbank.
- Lade die Berechtigungstabellen neu.

### 3.4. Datenbank und Benutzer für Django erstellen

Melde dich bei MariaDB an:

```bash
sudo mysql -u root -p
```

Erstelle eine neue Datenbank und einen neuen Benutzer:

```sql
CREATE DATABASE myproject CHARACTER SET UTF8MB4 COLLATE UTF8MB4_GENERAL_CI;
CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'django_password';
GRANT ALL PRIVILEGES ON myproject.* TO 'django_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Erstellen des Django-Projekts

### 4.1. Django installieren

Installiere Django und den MariaDB-Connector innerhalb der virtuellen Umgebung:

```bash
pip3 install django mysqlclient
```

**Hinweis:** Falls Fehler bei der Installation von `mysqlclient` auftreten, installiere die erforderlichen Entwicklungsbibliotheken:

```bash
sudo apt install build-essential libssl-dev libffi-dev python3-dev default-libmysqlclient-dev
```

### 4.2. Django-Projekt erstellen

Erstelle ein neues Django-Projekt namens `backend`:

```bash
django-admin startproject backend .
```

**Hinweis:** Der Punkt `.` am Ende des Befehls bedeutet, dass das Projekt im aktuellen Verzeichnis erstellt wird.

### 4.3. Django-Anwendung erstellen

Erstelle eine Django-App namens `api`:

```bash
python3 manage.py startapp api
```

Registriere die App in `backend/settings.py`:

```python
INSTALLED_APPS = [
    # ...
    'api',
    # ...
]
```

---

## 5. Konfigurieren von Django zur Verwendung von MariaDB

### 5.1. Datenbankeinstellungen in Django konfigurieren

Öffne `backend/settings.py` und konfiguriere die `DATABASES`-Einstellung:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'myproject',          # Name der Datenbank
        'USER': 'django_user',        # Benutzername
        'PASSWORD': 'django_password',# Passwort
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}
```

### 5.2. Migrationen durchführen

Führe die Migrationen durch, um die Datenbanktabellen zu erstellen:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### 5.3. Superuser erstellen (optional)

Erstelle einen Superuser, um auf das Django-Admin-Interface zuzugreifen:

```bash
python3 manage.py createsuperuser
```

Gib die erforderlichen Informationen ein.

### 5.4. Backend-Server starten

Starte den Django-Entwicklungsserver:

```bash
python3 manage.py runserver 0.0.0.0:8000
```

**Hinweis:** Durch die Angabe von `0.0.0.0` wird der Server für externe Verbindungen geöffnet, was in WSL nützlich ist.

Teste im Browser unter `http://localhost:8000`, ob das Backend läuft.

---

## 6. Erstellen des Angular-Projekts

### 6.1. Node.js und npm installieren

Öffne eine neue Shell im übergeordneten Projektverzeichnis
````bash
cd myproject/
````
Falls Node.js und npm nicht installiert sind, installiere sie:

```bash
sudo apt install nodejs npm
```

Überprüfe die Installation:

```bash
node -v
npm -v
```

Falls die Versionen veraltet sind, kannst du Node.js aus den Nodesource-Repositories installieren:

```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

### 6.2. Angular CLI installieren

Installiere die Angular CLI global:

```bash
sudo npm install -g @angular/cli
```

### 6.3. Angular-Projekt erstellen

Wechsle in das Projektverzeichnis und erstelle ein neues Angular-Projekt namens `frontend`:

```bash
ng new frontend --no-standalone --skip-git --routing --style=scss --no-ssr
```

Erklärung der Optionen:

- **--no-standalone:** Das Projekt wird mit der klassischen Angular-Struktur erstellt, die NgModules wie app.module.ts verwendet.
- **--skip-git:** Überspringt die Initialisierung eines Git-Repositorys im Projektverzeichnis.
- **--routing:** Fügt eine app-routing.module.ts-Datei zum Projekt hinzu. Diese Datei enthält die Grundkonfiguration für das Angular-Routing-System.
- **--style=scss:** Alle generierten Stylesheets (z. B. für Komponenten) verwenden .scss anstelle von .css.
- **--no-ssr:** Deaktiviert Server-Side Rendering (SSR) und Static Site Generation (SSG).

### 6.4. Angular-Entwicklungsserver starten

Wechsle in das `frontend`-Verzeichnis und starte den Entwicklungsserver:

```bash
cd frontend
ng serve
```

Der Server läuft auf Port 4200. Besuche `http://localhost:4200` in deinem Browser.

### 6.5. Angular Material hinzufügen

Füge Angular-Material in der Angular entsprechenden Version hinzu:

```bash
ng add @angular/material@18.2.10
```

Fragen während der Installation:
- The package @angular/material@18.2.12 will be installed and executed.
Would you like to proceed?
  - Wähle `Yes` für die Bestätigung der  @angular/material Installation.
- Choose a prebuilt theme name, or "custom" for a custom theme:
  - Wähle ein gewünschtes vordefiniter Theme aus.
- Set up global Angular Material typography styles?
  - Wähle `Yes` für die Globale Verwendung von Globalen Angular Material-Typografiestilen.
- Include the Angular animations module?
  - Wähle `Include and enable animations` für die Aktivierung von Animationen im Broweser

### 6.6 !!Noch nicht getestet!! Optional - Angular-Architects

Hinzufuegen von vordefinierten Styles, in diesem Fall Paper-Design

```bash
ng add @angular-architects/paper-design
```

Fragen während der Installation:
- The package @angular-architects/paper-design@1.0.4 will be installed and executed.
Would you like to proceed?
  - Wähle `Yes` für die Bestätigung der  @angular-architects/paper-design Installation.

---
## 7. Integration von Angular und Django

### 7.1. CORS in Django konfigurieren

Damit das Angular-Frontend auf das Django-Backend zugreifen kann, müssen wir CORS (Cross-Origin Resource Sharing) konfigurieren.

#### 7.1.1. `django-cors-headers` installieren

Installiere das Paket **innerhalb** der virtuellen Umgebung:

```bash
cd myproject/backend/
pip3 install django-cors-headers
```

#### 7.1.2. Einstellungen konfigurieren

Füge `corsheaders` zu `INSTALLED_APPS` in `backend/settings.py` hinzu:

```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
    'api',
    # ...
]
```

Füge `CorsMiddleware` zu `MIDDLEWARE` hinzu, **direkt nach** `CommonMiddleware`:

```python
MIDDLEWARE = [
    # ...
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    # ...
]
```

Konfiguriere die zugelassenen Ursprünge am Ende der `settings.py`:

```python
# Gültige Adressen für Anfragen
#
CORS_ALLOWED_ORIGINS = [
    'http://localhost:4200',
]
```

### 7.2. Einfache API im Django-Backend erstellen

Erstelle eine einfache API, die eine Nachricht zurückgibt.

#### 7.2.1. View erstellen

Öffne `api/views.py` und füge folgende Funktion hinzu:

```python
from django.http import JsonResponse

def test_view(request):
    return JsonResponse({'message': 'Hello from Django!'})
```

#### 7.2.2. URL-Konfiguration

Erstelle `myproject/api/urls.py` 
```bash
cd myproject/api/
touch urls.py
```

und füge folgende Zeilen hinzu:

```python
from django.urls import path
from .views import test_view

urlpatterns = [
    path('test/', test_view, name='test'),
]
```
Füge in `backend/urls.py` die API-URLs und den include hinzu:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```

Starte den Backend-Server neu, falls er nicht läuft:

```bash
python manage.py runserver 0.0.0.0:8000
```

Teste die API unter `http://localhost:8000/api/test/`.

### 7.3. Angular-Frontend anpassen

#### 7.3.1. `provideHttpClient` importieren

Öffne `frontend/src/app/app.module.ts` und importiere `provideHttpClient`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
```

#### 7.3.2. Service erstellen

Erstelle einen Service, um die API aufzurufen:

```bash
ng generate service api
```

Bearbeite `frontend/src/app/api.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTestMessage(): Observable<any> {
    return this.http.get('http://localhost:8000/api/test/');
  }
}
```

#### 7.3.3. Komponente anpassen

Bearbeite `frontend/src/app/app.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  message: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTestMessage().subscribe(response => {
      this.message = response.message;
    });
  }
}
```

Bearbeite `frontend/src/app/app.component.html`:

```html
<h1>Angular Frontend</h1>
<p>{{ message }}</p>
```

#### 7.3.4. Frontend-Server starten

Stelle sicher, dass du im `frontend`-Verzeichnis bist, und starte den Server:

```bash
ng serve --host 0.0.0.0
```

Besuche `http://localhost:4200` und überprüfe, ob die Nachricht **"Hello from Django!"** angezeigt wird.

---

## 8. !!Noch nicht getestet!! Optional - Erstellen von Docker-Images für das Projekt

### 8.1. Dockerfile für das Django-Backend erstellen

Erstelle im Projektverzeichnis `~/myproject` eine Datei namens `Dockerfile`:

```dockerfile
# Backend Dockerfile
FROM python:3.9-slim

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Systemabhängigkeiten installieren
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev build-essential

# Abhängigkeiten kopieren und installieren
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Quellcode kopieren
COPY . .

# Port freigeben
EXPOSE 8000

# Startbefehl
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### 8.2. `requirements.txt` erstellen

Erstelle eine `requirements.txt` im Projektverzeichnis:

```text
Django
mysqlclient
django-cors-headers
```

### 8.3. Dockerfile für das Angular-Frontend erstellen

Erstelle im `frontend`-Verzeichnis eine Datei namens `Dockerfile`:

```dockerfile
# Frontend Dockerfile
FROM node:16 AS build

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .

# Build der Angular-App
RUN npm run build --prod

# Nginx verwenden, um das Build zu dienen
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Port freigeben
EXPOSE 80

# Startbefehl
CMD ["nginx", "-g", "daemon off;"]
```

### 8.4. Docker-Compose-Datei erstellen

Erstelle im Projektverzeichnis `~/myproject` eine `docker-compose.yml`:

```yaml
version: '3'

services:
  db:
    image: mariadb:latest
    restart: always
    environment:
      MYSQL_DATABASE: 'myproject'
      MYSQL_USER: 'django_user'
      MYSQL_PASSWORD: 'django_password'
      MYSQL_ROOT_PASSWORD: 'root_password'
    ports:
      - '3306:3306'
    volumes:
      - db_data:/var/lib/mysql

  backend:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - '8000:8000'
    depends_on:
      - db

  frontend:
    build:
      context: ./frontend
    ports:
      - '4200:80'
    depends_on:
      - backend

volumes:
  db_data:
```

### 8.5. Umgebungsvariablen konfigurieren

Passe die Django-Datenbankeinstellungen an, um die Umgebungsvariablen zu nutzen.

Bearbeite `backend/settings.py`:

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MYSQL_DATABASE', 'myproject'),
        'USER': os.environ.get('MYSQL_USER', 'django_user'),
        'PASSWORD': os.environ.get('MYSQL_PASSWORD', 'django_password'),
        'HOST': 'db',
        'PORT': '3306',
    }
}
```

### 8.6. Docker-Container starten

Starte die Docker-Container:

```bash
docker-compose up --build
```

Dies erstellt und startet die Dienste `db`, `backend` und `frontend`.

### 8.7. Zugriff auf die Anwendung

- **Frontend:** Besuche `http://localhost:4200`
- **Backend:** Die API ist unter `http://localhost:8000/api/` verfügbar

---

## 9. Zusammenfassung

Du hast nun eine vollständige Webanwendung mit Django und Angular erstellt, die unter Windows 11 mit WSL 2 und Docker läuft. Die Anwendung verwendet MariaDB als Datenbank und ist vollständig containerisiert, was die Bereitstellung und Skalierung erleichtert.

---

## 10. Zusätzliche Hinweise

- **Entwicklung in VS Code:** Durch die Verwendung der **Remote - WSL** Erweiterung kannst du nahtlos in der Linux-Umgebung entwickeln, während du die GUI von Windows nutzt.

- **Fehlerbehebung:** Achte auf Firewall-Einstellungen und Port-Konflikte, insbesondere wenn mehrere Dienste auf denselben Ports laufen.

- **Sicherheit:** In einer Produktionsumgebung sollten sensible Informationen wie Passwörter nicht im Klartext in den Dateien gespeichert werden. Verwende stattdessen Umgebungsvariablen oder Geheimnisverwaltungstools.

- **Weiterführende Schritte:** Du kannst das Projekt erweitern, indem du RESTful APIs mit Django REST Framework erstellst, erweiterte Routing-Module in Angular implementierst oder CI/CD-Pipelines für automatisiertes Deployment einrichtest.

---

Viel Erfolg bei der Entwicklung deiner Webanwendung!