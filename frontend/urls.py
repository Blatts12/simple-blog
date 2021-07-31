from django.conf.urls import url
from django.views.generic import RedirectView
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    url('favicon.ico', RedirectView.as_view(url='/static/frontend/favicon.ico')),
]
