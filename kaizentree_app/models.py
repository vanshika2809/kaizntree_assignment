from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

class Item(models.Model):
    sku = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag', blank=True)
    stock_status = models.CharField(max_length=20)
    available_stock = models.IntegerField()

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Build(models.Model):
    reference = models.CharField(max_length=100)
    item = models.ForeignKey(Item, related_name='builds', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    linked_sale_order = models.CharField(max_length=100, blank=True)
    creation_date = models.DateField()
    completion_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, default='Pending')
