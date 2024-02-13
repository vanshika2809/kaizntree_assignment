from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Item, Category, Tag

class APIEndpointTests(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='test12345')
        
        self.category = Category.objects.create(name='Test Category')
        self.tag = Tag.objects.create(name='Test Tag')
        
        self.item = Item.objects.create(
            sku='TGT-2561',
            name='Test Item',
            category=self.category,
            stock_status=True,
            available_stock=15
        )
        self.item.tags.add(self.tag)

    def test_get_items(self):
        """
        Confirm retrieval of items.
        """
        url = reverse('item-list') 
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_get_categories(self):
        """
        Confirm retrieval of categories.
        """
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_get_tags(self):
        """
        Confirm retrieval of tags.
        """
        url = reverse('tag-list') 
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_create_item(self):
        """
        Confirm creation of a new item.
        """
        self.client.login(username='testuser', password='test12345')
        url = reverse('item-list')
        data = {
            'sku': 'TGH-7817',
            'name': 'New Test Item',
            'category': self.category.id,
            'tags': [self.tag.id],
            'stock_status': "True",
            'available_stock': 10
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_category(self):
        """
        Confirm creation of a new category.
        """
        self.client.login(username='testuser', password='test12345')  
        url = reverse('category-list') 
        data = {'name': 'New Category'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Category.objects.filter(name='New Category').exists())
        self.assertEqual(Category.objects.get(name='New Category').name, 'New Category')

    def test_login(self):
        """
        Confirm login with the test user.
        """
        url = reverse('login') 
        data = {'username': 'testuser', 'password': 'test12345'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)

    def test_register_user(self):
        """
        Confirm registration of a new user.
        """
        url = reverse('register') 
        data = {'username': 'newuser', 'password': 'newpassword', 'email': 'newuser@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())
