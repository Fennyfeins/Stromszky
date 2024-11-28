from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.views import View
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
import json
from django.contrib.auth.models import User

from .models import Customer
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomerSerializer
from django.shortcuts import get_object_or_404

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        username = body.get('username')
        password = body.get('password')

        user = authenticate(username=username, password=password)

        if user:
            return JsonResponse({'success': True, 'message': 'Login erfolgreich'})
        return JsonResponse({'success': False, 'message': 'Ungültiger Benutzername oder Passwort'}, status=401)
    return JsonResponse({'success': False, 'message': 'Nur POST-Requests sind erlaubt'}, status=405)

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            # JSON-Daten aus der Anfrage extrahieren
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            confirm_password = data.get('confirm_password')

            # Überprüfen, ob alle Felder ausgefüllt sind
            if not username or not password or not confirm_password:
                return JsonResponse({'success': False, 'message': 'Alle Felder sind erforderlich'}, status=400)

            # Überprüfen, ob die Passwörter übereinstimmen
            if password != confirm_password:
                return JsonResponse({'success': False, 'message': 'Passwörter stimmen nicht überein'}, status=400)

            # Überprüfen, ob der Benutzername bereits existiert
            if User.objects.filter(username=username).exists():
                return JsonResponse({'success': False, 'message': 'Benutzername ist bereits vergeben'}, status=400)

            # Benutzer erstellen
            user = User.objects.create_user(username=username, password=password)
            user.save()

            return JsonResponse({'success': True, 'message': 'Benutzer erfolgreich registriert'}, status=201)

        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Nur POST-Requests sind erlaubt'}, status=405)

class CustomerView(APIView):
    # Testweise AllowAny weil die Authentifizierung nicht funktioniert!
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

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
    
    def put(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)