from django.urls import path, include
from .views import PostViewSet, FeedView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('api/post', PostViewSet, basename='post')


urlpatterns = [
    path('', include(router.urls)),
    path('api/feed/', FeedView.as_view())
]
