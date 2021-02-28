from django.db import models
from django.contrib.auth.models import User 
#from django.utils.timezone import now
# Create your models here.
#blog_flag has different flats like CR - Create , CO - Comment
#UP - Update , DE - Delete , LI - Like , SH - Share
class blog_flag(models.Model):
    flag = models.CharField(unique=True ,max_length=2)
    desc = models.CharField(max_length=50)

    def __str__(self):
        return self.desc

# refering to system defined table User
# class blog_user(models.Model):
#     fname = models.CharField(max_length=30,null=True)
#     lname = models.CharField(max_length=30,null=True)
#     emailaddress = models.EmailField()
#     username = models.CharField(unique=True, max_length=50,null=True)
#     password = models.CharField(max_length=30,null=True)

#     def __str__(self):
#         return self.username
#blog_details is to capture all blog details
class blog_details(models.Model):
    title = models.CharField(primary_key=True, max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='imagefolder',null=True,blank=True)
    flag = models.ForeignKey(blog_flag,on_delete =models.SET_NULL, null=True )
    username = models.ForeignKey(User,on_delete =models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now=True)
    
    
    class Meta:
        unique_together = (('title','flag','username','date'),)

    def __str__(self):
        return self.title
