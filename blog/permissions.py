from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author.id == request.user.id


class IsBloggerOrIsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(
            request.user.is_staff or
            request.user.groups.all().filter(name="Blogger").exists()
        )


class IsStaffOrIsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(
            request.user.is_staff or
            obj.author.id == request.user.id
        )


class IsBloggerOrIsStaffOrIsOwnerToDelete(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return bool(
                request.user.is_staff or
                obj.author.id == request.user.id or
                request.user.groups.all().filter(name="Blogger").exists()
            )

        return True
