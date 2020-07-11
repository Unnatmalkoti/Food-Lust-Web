from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import UserProfile
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserProfileSerializer

#Register API
class RegisterAPI (generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception= True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context= self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

#Login API

class LoginAPI (generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception= True)
        user = serializer.validated_data
        profile = UserProfileSerializer(user.userprofile_set.first())
        return Response({
            "user": UserSerializer(user, context= self.get_serializer_context()).data,
            "profile": profile.data,
            "token": AuthToken.objects.create(user)[1]
        })

#Get User API
class UserAPI(generics.GenericAPIView):
    permission_classes=[permissions.IsAuthenticated]

    serializer_class =UserSerializer
    def get(self, request):
        user = self.request.user
        serializer = self.get_serializer(user)
        profile = UserProfileSerializer(user.userprofile_set.first())
        return Response ({
            "user": serializer.data,
            "profile": profile.data,
         })