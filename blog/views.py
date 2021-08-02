from blog.pagination import FeedPagination, CommentPagination
from rest_framework import generics
from blog.serializers import CommentSerializer, PostSerializer
from rest_framework import viewsets, permissions
from .models import Comment, Post
from .permissions import IsStaffOrIsOwnerOrReadOnly, IsBloggerOrIsStaffOrIsOwnerToDelete


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsStaffOrIsOwnerOrReadOnly
    ]
    serializer_class = PostSerializer

    def perform_create(self, serializer, *args, **kwargs):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsBloggerOrIsStaffOrIsOwnerToDelete,
    ]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        post = Post.objects.get(pk=self.request.data["post"])
        serializer.save(author=self.request.user, post=post)


class FeedView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = FeedPagination
    permission_classes = [
        permissions.AllowAny
    ]


class CommentsView(generics.ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = CommentPagination
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        post = Post.objects.get(pk=self.kwargs.get("id"))
        return post.comments.all()
