from django.shortcuts import render, redirect
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.core.files.storage import default_storage
from django.core import serializers
from django.http import HttpResponse
from django.contrib.auth.models import User
from . forms import RegisterUserForm, LoginUserForm, UploadForm
from . models import Post, Uploads
from itertools import chain
import json

# homepage
def home(request):
    return render(request, 'pages/home.html')

# login functionality
def login(request):
    if request.method == "POST":
        loginForm = LoginUserForm(request.POST)

        if loginForm.is_valid():
            
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:

                auth.login(request, user)
                return redirect('/')
    else:
        loginForm = LoginUserForm()

    context = { 'loginForm': loginForm }

    return render(request, 'pages/login.html', context=context)

# register functionality
def register(request):

    if request.method == "POST":
        registerForm = RegisterUserForm(request.POST)

        if registerForm.is_valid():

            registerForm.save()

            return redirect('login')

    else:
        registerForm = RegisterUserForm()

    context = { 'registerForm': registerForm }

    return render(request, 'pages/register.html', context=context)

# logout functionality
def logout(request):

    auth.logout(request)

    return redirect('/')

# upload functionality
@login_required(login_url='login')
def upload(request):

    if request.method == "POST":

        uploadForm = UploadForm(request.POST, request.FILES)

        if uploadForm.is_valid():

            title = request.POST.get('title')
            description = request.POST.get('description')
            uploader_id = request.user.id
            files = request.FILES.getlist('file', False) # add false for verification if dictionary is empty

            # insert post in database
            db_post = Post.objects.create(
                title=title,
                description=description,
                uploader_id=uploader_id
            )
            db_post.save()

            # get last insert id from post db table
            last_post_id = (Post.objects.last()).id        

            if files is not False:
                # insert file data into db here
                for file in files:
                    f = file
                    file_name = file.name
                    file_extension = file.name.split('.')[1]
                    file_type = file.content_type
                    file_size = file.size
                    file_path = f'media/{file_name}'

                    #insert upload data into database
                    db_upload = Uploads.objects.create(
                        post=last_post_id,
                        uploader_id=uploader_id,
                        file_name=file_name,
                        file_extension=file_extension,
                        file_type=file_type,
                        file_size=file_size,
                        file_path=file_path
                    )

                    db_upload.save()

                    #save files to server
                    default_storage.save(file_name, f)

            return redirect('profile')

    else:
        uploadForm = UploadForm()

    return render(request, 'pages/upload.html')

# profile page
@login_required(login_url='login')
def profile(request):
    return render(request, 'pages/profile.html')

# profile edit post page
@login_required(login_url='login')
def profile_edit_post(request, id):

    posts = Post.objects.filter(id=id).select_related("uploader")
    uploads = Uploads.objects.filter(post=id).select_related("uploader")
    context = { 'posts' : posts, 'uploads' : uploads }

    # process edit form data
    if request.method == "POST":
        print(request.POST)

        title = request.POST.get('title')
        description = request.POST.get('description')

        Post.objects.filter(id=id).update(
            title=title,
            description=description
        )

        return redirect('profile')

    return render(request, 'pages/edit-post.html', context=context)

# profile archive post 
@login_required(login_url='login')
def profile_archive_post(request, id):

    Post.objects.filter(id=id).update(
        post_status=0
    )

    return redirect('profile')

# profile restore post 
@login_required(login_url='login')
def profile_restore_post(request, id):

    Post.objects.filter(id=id).update(
        post_status=1
    )

    return redirect('profile')

# api to get profile page data
def api_profile(request):

    posts = Post.objects.filter(uploader=request.user.id)
    uploads = Uploads.objects.filter(uploader=request.user.id)
    queryset = list(chain(posts, uploads))
    data = serializers.serialize('json', queryset)
    return HttpResponse(data, content_type="application/json;charset=UTF-8")

# api to get homepage data
def api_homepage(request):
    pass