from django.db import models
from django.contrib.auth.models import User

# Post Model
class Post(models.Model):

    post_status_options = (
        (1, 'active'),
        (0, 'inactive')
    )

    title = models.CharField(max_length=255, null=False, default='')
    description = models.TextField(null=True, default='')
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    post_status = models.IntegerField(choices=post_status_options, default=1)

class Uploads(models.Model):

    upload_status_options = (
        (1, "active"),
        (0, "inactive")
    )

    post_id = models.IntegerField(null=False)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    file_name = models.CharField(max_length=255, null=False)
    file_extension = models.CharField(max_length=30, null=False)
    file_type = models.TextField(null=False)
    file_size = models.CharField(max_length=255, null=False)
    file_path = models.TextField(null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    file_status = models.IntegerField(choices=upload_status_options, default=1)