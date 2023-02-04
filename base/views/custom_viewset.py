from rest_framework import viewsets
from rest_framework.serializers import Serializer


class FlexibleViewSet(viewsets.GenericViewSet):
    serializer_class = Serializer
    serializer_map = {}
    permission_map = {}

    def get_serializer_class(self):
        """
            Get serializer for each action
        """
        return self.serializer_map.get(self.action, self.serializer_class)

    def get_permissions(self):
        """
            Get permission for each action
        """
        return [permission() for permission in self.permission_map.get(self.action, self.permission_classes)]
