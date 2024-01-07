from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=""),
    
    path('login', views.login, name="login"),
    
    path('register', views.register, name="register"),

    path('logout', views.logout, name="logout"),

    path('upload', views.upload, name="upload"),
    
    path('profile', views.profile, name="profile"),
    
    path('profile/edit-post/<int:id>', views.profile_edit_post, name="edit-post"),
    
    path('profile/archive-post/<int:id>', views.profile_archive_post, name="archive-post"),
    
    path('profile/restore-post/<int:id>', views.profile_restore_post, name="restore-post"),
    
    path('api-profile', views.api_profile, name="api-profile")
]