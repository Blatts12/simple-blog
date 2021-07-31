from django.urls import path, include
from .views import CommentViewSet, CommentsView, PostViewSet, FeedView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('api/post', PostViewSet, basename='post')
router.register('api/comment', CommentViewSet, basename='comment')


urlpatterns = [
    path('', include(router.urls)),
    path('api/feed/', FeedView.as_view()),
    path('api/post/<int:id>/comments', CommentsView.as_view()),
]
