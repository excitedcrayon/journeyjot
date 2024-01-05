from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=""),
    
    path('login', views.login, name="login"),
    
    path('register', views.register, name="register"),

    path('logout', views.logout, name="logout"),
    
    path('upload', views.upload, name="upload"),
    
    path('profile', views.profile, name="profile"),
    
    path('api-profile', views.api_profile, name="api-profile")
]