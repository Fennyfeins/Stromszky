from django.shortcuts import render
from django.http import JsonResponse
from .models import Customer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomerSerializer
from django.shortcuts import get_object_or_404

def test_view(request):
    return JsonResponse({'message': 'Hello from Django!'})

def get_single_customer(request):
        id = 1
        obj = Customer.objects.get(pk=id)
        data = {
            'id': obj.id,
            'firstname': obj.firstname,
            'surname': obj.surname,
            'dateOfBirth': obj.dateOfBirth,
            'phone': obj.phone,
            'street': obj.street,
            'number': obj.number,
            'postalCode': obj.postalCode,
            'city': obj.city,
            'iban': obj.iban     
        }
        return JsonResponse(data)

def get_all_customers(request):
    objects = Customer.objects.all().values()
    data = list(objects)
    return JsonResponse(data, safe=False)

class CustomerView(APIView):
    def get(self, request):
        # Abrufen aller Kunden
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Erstellen eines neuen Kunden
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        # Aktualisieren eines bestehenden Kunden
        customer = get_object_or_404(Customer, pk=pk)  # Kunde anhand der ID finden
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        # Löschen eines bestehenden Kunden
        customer = get_object_or_404(Customer, pk=pk)  # Kunde anhand der ID finden
        customer.delete()  # Objekt löschen
        return Response(status=status.HTTP_204_NO_CONTENT)