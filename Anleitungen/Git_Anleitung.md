
# Anleitung: Git für ein bestehendes Projekt einrichten

## 1. Überprüfen, ob Git installiert ist
Öffne ein Terminal und überprüfe, ob Git installiert ist, indem du folgenden Befehl ausführst:
```bash
git --version
```
- Wenn Git installiert ist, wird die Version angezeigt (z. B. `git version 2.x.x`).
- Falls nicht, installiere Git:
  - **Ubuntu/Debian:** `sudo apt update && sudo apt install git`
  - **Windows:** [Git für Windows herunterladen](https://git-scm.com/download/win) und installieren
  - **MacOS:** `brew install git` (falls Homebrew installiert ist)

## 2. Zum Projektverzeichnis wechseln
Navigiere mit dem Terminal in das Verzeichnis deines Projekts:
```bash
cd /pfad/zu/deinem/projekt
```

## 3. Git-Repository initialisieren
Initialisiere ein neues Git-Repository im Projektverzeichnis:
```bash
git init
touch .gitignore
```

## 4. .gitignore verschieben
Verschiebe die .gitignore aus frontend/ in das übergeordnete Projektverzeichnis, um Dateien und Ordner zu definieren, die nicht in Git erfasst werden sollen.

```bash
mv myproject/frontend/.gitignore myproject/
```
Füge das 'venv/' Verzeichnis hinzu

```plaintext
venv/
```
Füge die `.gitignore`-Datei hinzu und committe sie:
```bash
git add .gitignore
git commit -m "Add .gitignore"
```


- Dadurch wird ein `.git`-Ordner im Verzeichnis erstellt, der alle Git-bezogenen Informationen enthält.

## 5. Dateien zum Staging-Bereich hinzufügen
Füge die Dateien deines Projekts dem Staging-Bereich hinzu:
```bash
git add .
```
- Der Punkt `.` fügt alle Dateien im aktuellen Verzeichnis hinzu.
- Alternativ kannst du auch bestimmte Dateien hinzufügen, z. B.:
  ```bash
  git add datei1 datei2
  ```

## 6. Ersten Commit erstellen
Speichere den aktuellen Stand der Dateien in Git:
```bash
git commit -m "Initial commit"
```
- Ersetze `"Initial commit"` durch eine Beschreibung, die den Stand der Dateien beschreibt.

## 7. Remote-Repository (optional) hinzufügen
Falls du dein Projekt mit einem Remote-Repository (z. B. auf GitHub, GitLab oder Bitbucket) synchronisieren möchtest, führe folgende Schritte aus:

### a. Remote-Repository erstellen
- Gehe zu deiner Git-Plattform (z. B. [GitHub](https://github.com)) und erstelle ein neues Repository.
- Kopiere die URL des Repositories (z. B. `https://github.com/username/repository.git`).

### b. Remote-Repository hinzufügen
Füge das Remote-Repository hinzu:
```bash
git remote add origin https://github.com/username/repository.git
```
- Ersetze die URL mit der URL deines Remote-Repositories.

## 8. Änderungen zum Remote-Repository pushen
Schiebe die Dateien in das Remote-Repository:
```bash
git branch -M main
git push -u origin main
```
- Der Branch wird auf `main` gesetzt, und der Code wird hochgeladen.

## 9. Git-Konfiguration anpassen (optional)
Falls noch nicht geschehen, konfiguriere Git mit deinem Namen und deiner E-Mail-Adresse:
```bash
git config --global user.name "Dein Name"
git config --global user.email "deine.email@example.com"
```
- Diese Informationen werden bei Commits verwendet.

## 10. Status und Log überprüfen (optional)
- **Status der Dateien:** 
  ```bash
  git status
  ```
- **Commit-Historie anzeigen:** 
  ```bash
  git log
  ```

---

Jetzt ist dein Projekt in Git versioniert, und du kannst Änderungen verfolgen oder mit einem Remote-Repository synchronisieren! 🎉
