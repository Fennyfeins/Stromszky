from django.shortcuts import render
from django.http import JsonResponse
from .models import Customer

def test_view(request):
    return JsonResponse({'message': 'Hello from Django!'})

# Anfrage eines Kunden nach der ID
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
