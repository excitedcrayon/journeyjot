from django.shortcuts import render
from . forms import RegisterUserForm, LoginUserForm

def home(request):
    return render(request, 'pages/home.html')

def login(request):
    if request.method == "POST":
        loginForm = LoginUserForm(request.POST)

        if loginForm.is_valid():
            print("Login form valid")
    else:
        loginForm = LoginUserForm()

    context = { 'loginForm': loginForm }

    return render(request, 'pages/login.html', context=context)

def register(request):
    if request.method == "POST":
        registerForm = RegisterUserForm(request.POST)
    else:
        registerForm = RegisterUserForm()

    context = { 'registerForm': registerForm }

    return render(request, 'pages/register.html', context=context)