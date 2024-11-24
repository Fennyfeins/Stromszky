
# Adding Django Rest Framework to an Angular-Django Project

This guide explains how to integrate Django Rest Framework (DRF) into your Django backend and connect it to your Angular frontend.

---

## **1. Install Django Rest Framework**

Install DRF in your Django environment:

```bash
pip install djangorestframework
```

Optional: For browsable API documentation, install `markdown`:

```bash
pip install markdown
```

---

## **2. Add DRF to Installed Apps**

In `settings.py`, add `rest_framework` to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # Other apps
    'rest_framework',
]
```

---

## **3. Configure DRF Settings**

Optionally, add a base configuration for DRF in `settings.py`:

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

## **4. Create API Endpoints**

### **4.1 Create a Django Model**

Define a model for `Customer` (if not already created).

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

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

### **4.2 Create a Serializer**

**serializers.py**
```python
from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
```

### **4.3 Create Views**

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

### **4.4 Register URL**

**urls.py**
```python
from django.urls import path
from .views import CustomerView

urlpatterns = [
    path('api/customers/', CustomerView.as_view(), name='customers-api'),
]
```

---

## **5. Create Angular Service for API**

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

## **6. Create Angular Component for API**

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
      console.log('Customer created:', response);
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

<button (click)="saveCustomer()">Add Customer</button>
```

---

## **7. Configure CORS (Cross-Origin Resource Sharing)**

If your Angular frontend and Django backend are on different hosts, enable CORS.

### Installation:
```bash
pip install django-cors-headers
```

### Configuration:
Add `corsheaders` to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    'corsheaders',
    # other apps
]
```

Add `CorsMiddleware` to `MIDDLEWARE`:

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # other middleware
]
```

Allow specific origins:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",  # Angular frontend
]
```

---

## **Summary**

- **In Django:** Install DRF, create a model, serializer, and API views.
- **In Angular:** Create a service and component to interact with the Django API.
- **Optional:** Configure CORS for cross-origin communication.
