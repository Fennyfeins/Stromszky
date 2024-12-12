from django.urls import path
from .views import CustomerView, login_view, register_view
from django.http import JsonResponse

urlpatterns = [
    path('customers/', CustomerView.as_view(), name='customers-api'),
    path('customers/<int:pk>/', CustomerView.as_view(), name='customer-detail-api'),
    path('login/', login_view, name='login-api'),
    path('register/', register_view, name='register-api'),
    path('', lambda request: JsonResponse({'message': 'API root endpoint'}, status=200)),
    # path('logout/', logout_view, name='logout'),
]
