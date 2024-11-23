from django.urls import path
from .views import single_customer
from .views import test_view

urlpatterns = [
    path('test/', test_view, name='test'),
    path('customer/', single_customer),
]