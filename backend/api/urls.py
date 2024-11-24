from django.urls import path
from .views import get_single_customer
from .views import get_all_customers
from .views import test_view
from .views import CustomerView

urlpatterns = [
    path('test/', test_view, name='test'),
    path('singleCustomer/', get_single_customer),
    path('allCustomers/', get_all_customers),
    path('customers/', CustomerView.as_view(), name='customers-api'),
]