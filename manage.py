#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    # Set the Django settings module
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kaizntree_backend.settings')
    try:
        # Import execute_from_command_line function from Django
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Handle import error
        raise ImportError(
            "Django could not be imported. Please ensure Django is installed "
            "and available on your PYTHONPATH environment variable. Also, make "
            "sure you have activated a virtual environment."
        ) from exc
    # Execute command line arguments using execute_from_command_line
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
