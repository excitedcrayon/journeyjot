from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput, Textarea

class RegisterUserForm(UserCreationForm):
    class Meta:

        model = User
        fields = [
            'username',
            'email',
            'password1',
            'password2'
        ]

class LoginUserForm(forms.Form):

    username = forms.CharField(widget=TextInput(), max_length=50)
    password = forms.CharField(widget=PasswordInput(), max_length=100)


class UploadForm(forms.Form):
    title = forms.CharField(widget=TextInput(), max_length=255)
    description = forms.CharField(widget=Textarea(), required=False)
    file = forms.FileField(required=False)