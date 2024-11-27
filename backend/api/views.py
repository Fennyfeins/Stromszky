from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse

from .models import Customer
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomerSerializer
from django.shortcuts import get_object_or_404

@csrf_exempt
@api_view(['GET', 'POST'])
def authentication_view(request):
    if request.method == 'GET':
        form = AuthenticationForm()
        return render(request, 'login.html', {'form': form})

    elif request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()

            if user is not None:
                login(request, user)  # Erzeugt die Session
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=401)

            return JsonResponse({"message": "Login successful", "redirect_url": "/api/customers/"}, status=200)
        else:
            return render(request, 'login.html', {'form': form})


@csrf_exempt
@api_view(['GET'])
def logout_view(request):
    logout(request)
    return redirect('login-api')

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