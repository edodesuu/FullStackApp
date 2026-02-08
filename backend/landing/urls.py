from django.urls import path
from .views import SubscribeView, DashboardStatsView

urlpatterns = [
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('stats/', DashboardStatsView.as_view(), name='stats'),
]