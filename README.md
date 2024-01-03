# JourneyJot
Python Django Based Application

## Steps to setting up the project
* Create your virtual environment (to install django and other packages)
```
    python -m venv (path i.e journeyjot/venv) .
    python3 -m venv (path i.e journeyjot/venv) .
```

* Activate virtual environment
```
    source venv/bin/activate
```

* If you wish to Deactivate virtual environment
```
    deactivate
```

* Install django framework
```
    (venv) pip install django
```

* Use django-admin to create project and app
```
    (venv) django-admin startproject project .
    (venv) django-admin startapp website
```

Now what is the difference between a project and an app?

* The **project** is the brains of the entire application, containing configuration and the likes
* The **app** is a component part of the application where you can configure models, views and templates.
* In summary, you can have only **1** project but **multiple** apps which achieve various functionalities

## Configuring some folders
* We need to configure some folders for use with our app (website).
```html
    <strong>static<strong> - will hold the base template to be inherited by all other templates
    <strong>media<strong> - will house all the uploaded media files from the web app
```
* Setup **static** folder (projects > settings.py)
```text
    import os

    .....

    STATIC_URL = 'static/'
    STATICFILES_DIRS = [ os.path.join(BASE_DIR,'website/static') ] - replace 'website/static' with your app name
    STATIC_ROOT = os.path.join(BASE_DIR, 'assets')

```

* Setup **media** folder ( journey jot > media )
```text

    .......

    # Media File Configuration
    MEDIA_ROOT= os.path.join(BASE_DIR, 'media')
    MEDIA_URL= "/media/"
```
<img src="readme/static_media.png">