from django.urls import path
from .views import CustomerView

urlpatterns = [
    path('customers/', CustomerView.as_view(), name='customers-api'),
]