from django.shortcuts import render, redirect
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate
from . forms import RegisterUserForm, LoginUserForm

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