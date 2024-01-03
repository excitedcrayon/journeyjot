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