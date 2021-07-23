from blog.pagination import StandardResultsSetPagination
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from blog.serializers import PostSerializer, PostDetailSerializer
from rest_framework import viewsets, permissions
from .models import Post


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PostSerializer

    def retrieve(self, request, pk=None):
        post = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = PostDetailSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        print(request.data)
        post = Post.objects.create(
            author=User.objects.get(pk=request.data['author']),
            title=request.data['title'],
            content=request.data['content']
        )
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FeedView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination
