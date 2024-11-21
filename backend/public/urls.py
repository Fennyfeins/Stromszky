from django.urls import path
from public.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]