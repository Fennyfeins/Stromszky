from django.shortcuts import render
from django.http import JsonResponse

def test_view(request):
    return JsonResponse({'message': 'Hello from Django!'})
