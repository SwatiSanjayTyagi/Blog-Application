from django.contrib import admin 

# Register your models here.
from .models import blog_flag
#from .models import blog_user 
from .models import blog_details
admin.site.register(blog_flag)
#admin.site.register(blog_user)
admin.site.register(blog_details)