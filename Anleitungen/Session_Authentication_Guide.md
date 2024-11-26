
# Anleitung: Umsetzung von Schritt 5 mit Session Authentication

## **Einleitung**

In dieser Anleitung zeige ich Ihnen, wie Sie **Schritt 5** unter Verwendung von **Session Authentication** umsetzen und wie sich das Testen dadurch verändert. **Session Authentication** nutzt die standardmäßige Sitzungsverwaltung von Django, um Benutzer zu authentifizieren. Dies ist besonders nützlich für Webanwendungen, bei denen Benutzer sich über Formulare anmelden und Cookies verwenden.

---

## **Schritt-für-Schritt-Anleitung zur Umsetzung von Schritt 5 mit Session Authentication**

### **Schritt 5: Authentifizierung mit Session Authentication sicherstellen**

#### **1. Sicherstellen, dass Session Authentication aktiviert ist**

In Ihrer `settings.py` sollte `SessionAuthentication` in den `DEFAULT_AUTHENTICATION_CLASSES` von Django REST Framework enthalten sein. Wenn Sie diese Einstellung nicht überschrieben haben, ist `SessionAuthentication` standardmäßig aktiviert.

```python
# settings.py

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        # Andere Authentifizierungsklassen können hier hinzugefügt werden
    ),
    # Weitere Einstellungen
}
```

#### **2. Benutzeranmeldung ermöglichen**

Um Benutzer authentifizieren zu können, müssen Sie eine Anmeldemöglichkeit bereitstellen. Dies kann auf verschiedene Weise erfolgen:

- **Standard-Django-Login-Ansicht** verwenden
- **Eigene Login-Ansicht und -Vorlage erstellen**
- **Drittanbieter-Pakete** wie `django-allauth` verwenden

**Beispiel für eine einfache Login-Ansicht:**

```python
# views.py

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # Oder zu einer anderen URL
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})
```

**Login-Vorlage (`login.html`):**

```html
<h2>Login</h2>
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Anmelden</button>
</form>
```

#### **3. Sicherstellen, dass die Session-Middleware aktiviert ist**

Die Session-Middleware muss in Ihrer `settings.py` aktiviert sein:

```python
# settings.py

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ... andere Middleware-Klassen
]
```

#### **4. Berechtigungsklasse `IsAuthenticated` in Ihren Views verwenden**

Wie bereits in der vorherigen Anleitung beschrieben, verwenden Sie die Berechtigungsklasse `IsAuthenticated`, um sicherzustellen, dass nur authentifizierte Benutzer auf bestimmte Views zugreifen können.

**Beispiel mit einer class-basierten View:**

```python
# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class GeschützteView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {'nachricht': 'Hallo, authentifizierter Benutzer!'}
        return Response(data)
```

---

## **Wie sich das Testen verändert**

Da Session Authentication auf Cookies basiert, müssen Sie beim Testen sicherstellen, dass die Sitzung korrekt initialisiert wurde. Dies beeinflusst, wie Sie Ihre API-Endpunkte testen.

### **Testing im Browser**

1. **Anmeldung im Browser**

   - Rufen Sie Ihre Login-Seite auf, z.B. `http://localhost:8000/login/`.
   - Melden Sie sich mit gültigen Benutzerdaten an.
   - Nach erfolgreicher Anmeldung wird ein Session-Cookie im Browser gesetzt.

2. **Zugriff auf geschützte API-Endpunkte**

   - Navigieren Sie zu Ihrem geschützten API-Endpunkt, z.B. `http://localhost:8000/api/geschützte-view/`.
   - Da der Browser das Session-Cookie sendet, sollten Sie Zugriff auf die Ressource haben und die erwarteten Daten sehen.

### **Testing mit Postman**

Beim Testen mit Postman müssen Sie die Authentifizierungssitzung manuell verwalten.

#### **Option 1: Verwendung von Postman-Cookies**

1. **Login-Anfrage erstellen**

   - Erstellen Sie in Postman eine **POST**-Anfrage an Ihre Login-URL (`http://localhost:8000/login/`).
   - **Header:** Setzen Sie `Content-Type` auf `application/x-www-form-urlencoded`.
   - **Body:** Wählen Sie **"form-data"** oder **"x-www-form-urlencoded"** und fügen Sie die Felder hinzu:

     ```
     username: IhrBenutzername
     password: IhrPasswort
     ```

2. **CSRF-Token handhaben**

   - Django erwartet bei POST-Anfragen ein gültiges CSRF-Token.
   - Rufen Sie zunächst das CSRF-Token ab, indem Sie eine **GET**-Anfrage an die Login-Seite senden und das Token aus den Cookies oder der Antwort extrahieren.
   - Fügen Sie das CSRF-Token in den Header Ihrer POST-Anfrage ein:

     ```
     X-CSRFToken: IhrCSRFToken
     ```

3. **Cookies verwalten**

   - Postman speichert Cookies automatisch. Nach der erfolgreichen Login-Anfrage wird das Session-Cookie gespeichert.
   - Sie können die gespeicherten Cookies einsehen, indem Sie auf das **Cookies**-Symbol in Postman klicken.

4. **Geschützte API-Endpunkte aufrufen**

   - Erstellen Sie eine neue **GET**-Anfrage an Ihren geschützten Endpunkt (`http://localhost:8000/api/geschützte-view/`).
   - Da Postman die Cookies aus der vorherigen Anfrage verwendet, sollten Sie Zugriff auf die Ressource haben.

---

## **Wichtige Hinweise beim Testen mit Session Authentication**

### **1. CSRF-Token berücksichtigen**

- Bei **POST**, **PUT**, **PATCH** oder **DELETE** Anfragen erwartet Django ein gültiges CSRF-Token.
- Bei **GET**-Anfragen ist kein CSRF-Token erforderlich.

### **2. Einschränkungen von Session Authentication**

- **Nur für webbasierte Clients geeignet**, die Cookies unterstützen.
- **Nicht ideal für mobile Apps oder Drittanbieter-Clients**, da diese oft keine Cookies verwenden oder Sitzungen nicht effektiv handhaben können.

---

**Bei weiteren Fragen oder wenn Sie Unterstützung bei einem der Schritte benötigen, stehe ich Ihnen gerne zur Verfügung!**
