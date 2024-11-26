from django.urls import path
from .views import CustomerView, authentication_view, logout_view

urlpatterns = [
    path('customers/', CustomerView.as_view(), name='customers-api'),
    path('customers/<int:pk>/', CustomerView.as_view(), name='customer-detail-api'),
    path('login/', authentication_view, name='login-api'),
    path('logout/', logout_view, name='logout'),
]