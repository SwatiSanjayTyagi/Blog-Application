from django.urls import include, path
from rest_framework import routers
from .import views

router = routers.DefaultRouter() #api setting
router.register(r'blog_details',views.blog_detailsview)
router.register(r'users',views.User_detailsview)

urlpatterns = [
    path(r'', include(router.urls)),
    #path('auth/',include('rest_framework.urls',namespace='rest_framework'))
    path('api-auth/',views.CustomAuthToken.as_view())
    # path('', views.blog_detailsview.as_view(), name= 'blog_details'),
    # path('User_details/', views.User_detailsview.as_view(), name= 'User_details')
]