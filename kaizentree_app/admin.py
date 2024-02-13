from django.contrib import admin

# Register your models here.
from .models import Category, Item, Tag, Build

admin.site.register(Category)
admin.site.register(Item)
admin.site.register(Tag)
admin.site.register(Build)
