
# Django Angular Integration: Saving Customer Objects to the Database

This guide explains how to set up a Django backend to save `Customer` objects and integrate it with an Angular frontend.

## **1. Django Model Creation**

Create a Django model that mirrors the structure of the Angular `Customer` interface.

### **models.py**
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

## **2. Database Migration**

Run the migrations to apply the model to the database.

```bash
python manage.py makemigrations
python manage.py migrate
```

## **3. Create a Serializer**

Define a serializer to convert JSON data to the Django model.

### **serializers.py**
```python
from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
```

## **4. Create a View for Saving Customers**

Create a view to handle HTTP POST requests and save the customer to the database.

### **views.py**
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer
from .serializers import CustomerSerializer

class CustomerCreateView(APIView):
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## **5. Register the URL**

Add the view to your Django URLs.

### **urls.py**
```python
from django.urls import path
from .views import CustomerCreateView

urlpatterns = [
    path('customers/', CustomerCreateView.as_view(), name='create-customer'),
]
```

## **6. Angular Service for API Integration**

Create an Angular service to interact with the Django API.

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
  private apiUrl = 'http://localhost:8000/customers/'; // Django-API-URL

  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
}
```

## **7. Example Usage in Angular Component**

Use the Angular service to save customer data.

### **customer-form.component.ts**
```typescript
import { Component } from '@angular/core';
import { CustomerService, Customer } from './customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent {
  constructor(private customerService: CustomerService) {}

  saveCustomer() {
    const customer: Customer = {
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

    this.customerService.createCustomer(customer).subscribe(
      (response) => {
        console.log('Customer saved:', response);
      },
      (error) => {
        console.error('Error saving customer:', error);
      }
    );
  }
}
```

## **8. Angular HTML Template**

Create a form to gather user input.

### **customer-form.component.html**
```html
<form (ngSubmit)="saveCustomer()">
  <label for="firstname">First Name:</label>
  <input id="firstname" [(ngModel)]="customer.firstname" name="firstname" required />

  <label for="surname">Surname:</label>
  <input id="surname" [(ngModel)]="customer.surname" name="surname" required />

  <!-- Add other fields as necessary -->

  <button type="submit">Save</button>
</form>
```

---

## **Summary**

- In Django, create a model, serializer, and API view for handling customer data.
- In Angular, create a service and component to send customer data to the Django API.
- Test the integration and verify that customers are saved to the database.
