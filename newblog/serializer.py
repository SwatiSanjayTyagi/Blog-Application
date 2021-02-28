from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User 
from .models import blog_details , blog_flag #, blog_user

# class BlogSerializer(serializers.HyperlinkedModelSerializer):
#     url = serializers.HyperlinkedIdentityField(view_name="blog-detail")
#     class Meta:
#         model = blog_details
#         fields = ('url','title','content','image','flag','username','date') 

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     url = serializers.HyperlinkedIdentityField(view_name="user-detail")
#     class Meta:
#         model = User
#         fields = ['url', 'username','first_name','last_name','password']

# class FlagSerializer(serializers.HyperlinkedModelSerializer):
#     url = serializers.HyperlinkedIdentityField(view_name="flag-detail")
#     class Meta:
#         model = blog_flag
#         fields = ('url','flag','desc') 
class BlogSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = blog_details
        #fields = '__all__'
        fields = ('title','content','image','flag','username','date') 

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        #fields = '__all__'
        fields = ['id','first_name','last_name','email','username','password']
        extra_kwargs = {'password':{'write_only':True, 'required':True}} # this is for not displaying password and enable to create new user

    def create(self,validate_data): # create new user
        user = User.objects.create_user(**validate_data)
        Token.objects.create(user=user) # create token while adding new user to db
        return user

class FlagSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = blog_flag
        #fields = '__all__'
        fields = ('id','flag','desc') 
