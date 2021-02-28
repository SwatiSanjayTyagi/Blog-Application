######################################################code for Modelviewset
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from .serializer import BlogSerializer , FlagSerializer , UserSerializer
from .models import blog_flag , blog_details # , blog_user

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


# Create your views here.
                        
class blog_detailsview(viewsets.ModelViewSet): #for all records
    serializer_class = BlogSerializer
    queryset = blog_details.objects.all()    
    
    # def get(self,request,*args,**kwargs):
    #     NewBlog = User.objects.all()
    #     serializer = BlogSerializer (NewBlog,many=True)
    #     return JsonResponse(serializer.data, safe = False)
 
    # @csrf_exempt
    # def post(self,request,*args,**kwargs):
    #     data = JSONParser().parse(request.data)
    #     serializer =BlogSerializer (data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, status = 201)
    #     return JsonResponse(serializer.errors, status = 400)

# class Singleblog_detailsview(viewsets.ModelViewSet): #for single record
#     serializer_class = BlogSerializer
#     queryset = blog_details.objects.all()    
#     def get_object(self,pk):
#         try:
#             return blog_details.objects.get(pk=pk)
#         except blog_details.DoesNotExist:
#             return HttpResponse(status=404)
        
#     def get(self,request,*args,**kwargs):
#         blogdata=self.get_object(kwargs['blog_id'])
#         serializer = BlogSerializer(blogdata)
#         return JsonResponse(serializer.data)
 
#     @csrf_exempt
#     def put(self,request,*args,**kwargs):   
#         blogupdate=self.get_object(kwargs['blog_id'])
#         serializer =BlogSerializer(blogupdate,request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors,status =400)
 
#     #@csrf_exempt
#     def delete(self,request,*args,**kwargs):
#         blogdel=self.get_object(kwargs['blog_id'])
#         blogdel.delete()
#         return HttpResponse(status=204)  

class flag_detailsview(viewsets.ModelViewSet):
    serializer_class = FlagSerializer
    queryset = blog_flag.objects.all()
    
class User_detailsview(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # def get(self,request,*args,**kwargs):
    #     NewUser = User.objects.all()
    #     serializer = UserSerializer (NewUser,many=True)
    #     return JsonResponse(serializer.data, safe = False)
 
    # @csrf_exempt
    # def post(self,request,*args,**kwargs):
    #     data = JSONParser().parse(request.data)
    #     serializer =UserSerializer (data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, status = 201)
    #     return JsonResponse(serializer.errors, status = 400)

    # class CustomAuthToken(ObtainAuthToken):

    #     def post(self, request, *args, **kwargs):
    #         serializer = self.serializer_class(data=request.data,context={'request': request})
    #         serializer.is_valid(raise_exception=True)
    #         user = serializer.validated_data['user']
    #         token, created = Token.objects.get_or_create(user=user)
    #         return Response({
    #             'token': token.key,
    #             'user_id': user.pk
    #         })
class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'userid': user.id

        })