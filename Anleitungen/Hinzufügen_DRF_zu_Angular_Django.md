
# Hinzufügen des Django Rest Frameworks zu einem Angular-Django-Projekt

Diese Anleitung erklärt, wie du das Django Rest Framework (DRF) in dein Django-Backend integrierst und es mit deinem Angular-Frontend verbindest.

---

## **1. Django Rest Framework installieren**

Installiere das DRF in deiner Django-Umgebung:

```bash
pip3 install djangorestframework
```

Optional: Für eine browsbare API-Dokumentation installiere `markdown`:

```bash
pip3 install markdown
```

---

## **2. DRF zu den Installierten Apps hinzufügen**

Füge in `settings.py` `rest_framework` zu den `INSTALLED_APPS` hinzu:

```python
INSTALLED_APPS = [
    # Andere Apps
    'rest_framework',
]
```

---

## **3. DRF-Einstellungen konfigurieren**

Optional kannst du in `settings.py` eine Basiskonfiguration für DRF hinzufügen:

```python
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
```

---

## **4. API-Endpunkte erstellen**

### **4.1 Ein Django-Modell erstellen**

Definiere ein Modell für `Customer` (falls noch nicht vorhanden).

**models.py**
```python
from django.db import models

class Customer(models.Model):
    firstname = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=15)
    street = models.CharField(max_length=200)
    number = models.CharField(max_length=10)
    postal_code = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    iban = models.CharField(max_length=34)

    def __str__(self):
        return f"{self.firstname} {self.surname}"
```

Führe die Migrationen aus:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### **4.2 Einen Serializer erstellen**

**serializers.py**
```python
from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
```

**Hinweis:** Wenn rest_framework Import eine Warnung oder einen Fehler ausgibt, .vscode/settings.json und die Einstellung des Interpreters in VSCode mit Strg+Shift+p ueberpruefen.

### **4.3 Views erstellen**

**views.py**
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer
from .serializers import CustomerSerializer

class CustomerView(APIView):
    def get(self, request):
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

### **4.4 URL registrieren**

**urls.py**
```python
from django.urls import path
from .views import CustomerView

urlpatterns = [
    path('api/customers/', CustomerView.as_view(), name='customers-api'),
]
```

---

## **5. Angular-Service für die API**

### **customer.service.ts**
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Customer {
  id: number;
  firstname: string;
  surname: string;
  dateOfBirth: Date;
  phone: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  iban: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8000/api/customers/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
}
```

---

## **6. Angular-Komponente für die API**

### **customer.component.ts**
```typescript
import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  saveCustomer() {
    const newCustomer: Customer = {
      id: 0,
      firstname: 'Max',
      surname: 'Mustermann',
      dateOfBirth: new Date('1990-01-01'),
      phone: '123456789',
      street: 'Musterstraße',
      number: '10',
      postalCode: '12345',
      city: 'Musterstadt',
      iban: 'DE12345678901234567890',
    };

    this.customerService.createCustomer(newCustomer).subscribe((response) => {
      console.log('Kunde erstellt:', response);
      this.customers.push(response);
    });
  }
}
```

### **customer.component.html**
```html
<ul>
  <li *ngFor="let customer of customers">
    {{ customer.firstname }} {{ customer.surname }} ({{ customer.city }})
  </li>
</ul>

<button (click)="saveCustomer()">Kunden hinzufügen</button>
```

---

## **7. CORS (Cross-Origin Resource Sharing) konfigurieren**

Falls dein Angular-Frontend und Django-Backend auf unterschiedlichen Hosts laufen, aktiviere CORS.

### Installation:
```bash
pip install django-cors-headers
```

### Konfiguration:
Füge `corsheaders` zu `INSTALLED_APPS` hinzu:

```python
INSTALLED_APPS = [
    'corsheaders',
    # andere Apps
]
```

Füge `CorsMiddleware` zu `MIDDLEWARE` hinzu:

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # andere Middleware
]
```

Erlaube spezifische Ursprünge:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",  # Angular-Frontend
]
```

---

## **Zusammenfassung**

- **In Django:** Installiere DRF, erstelle ein Modell, einen Serializer und API-Views.
- **In Angular:** Erstelle einen Service und eine Komponente, um mit der Django-API zu interagieren.
- **Optional:** Konfiguriere CORS für die Kommunikation zwischen verschiedenen Hosts.
