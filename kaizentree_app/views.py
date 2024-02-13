from django.shortcuts import render

from rest_framework import viewsets
from .models import Category, Item, Tag, Build
from .serializers import CategorySerializer, ItemSerializer, TagSerializer, BuildSerializer

#_______________________AUTH__________________
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, TokenObtainSerializer

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginAPIView(generics.GenericAPIView):
    serializer_class = TokenObtainSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
#________________________AUTH_____________________________


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        # queryset = self.queryset
        # search = self.request.query_params.get('search', None)

        # if search:
        #     queryset = queryset.filter(name__icontains=search)

        # return queryset
        queryset = self.queryset
        search = self.request.query_params.get('search', None)
        category = self.request.query_params.get('category', None)
        stock_status = self.request.query_params.get('stock_status', None)
        sort_order = self.request.query_params.get('sort', None)

        if search:
            queryset = queryset.filter(name__icontains=search)
        if category:
            queryset = queryset.filter(category__id=category)
        if stock_status:
            queryset = queryset.filter(stock_status=stock_status)
        
        # Assuming 'available_stock' is the field name in your model for stock quantity
        if sort_order == 'asc':
            queryset = queryset.order_by('available_stock')
        elif sort_order == 'desc':
            queryset = queryset.order_by('-available_stock')

        return queryset

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class BuildViewSet(viewsets.ModelViewSet):
    queryset = Build.objects.all()
    serializer_class = BuildSerializer

