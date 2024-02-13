
"""
WSGI configuration for the kaizntree_backend project.

This file exposes the WSGI callable as a module-level variable named application.

For additional details about this file, please refer to the Django documentation:
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kaizntree_backend.settings')

application = get_wsgi_application()