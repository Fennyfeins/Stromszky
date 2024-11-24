from django.urls import path
from .views import single_customer
from .views import all_customers
from .views import test_view

urlpatterns = [
    path('test/', test_view, name='test'),
    path('singleCustomer/', single_customer),
    path('allCustomers', all_customers)
]