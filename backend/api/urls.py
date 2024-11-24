from django.urls import path
from .views import get_single_customer
from .views import get_all_customers
from .views import test_view

urlpatterns = [
    path('test/', test_view, name='test'),
    path('singleCustomer/', get_single_customer),
    path('allCustomers/', get_all_customers)
]