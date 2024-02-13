Kaizntree
Kaizntree is a user-friendly and secure platform designed to simplify inventory management for businesses. It offers an intuitive dashboard to track items, categories, and stock levels with advanced filtering options for precise data retrieval. The application ensures data integrity and provides real-time inventory insights while optimizing performance through caching techniques. Tailored for modern enterprises, Kaizntree streamlines inventory processes, making it a valuable tool for efficient oversight.

Getting Started
Follow these steps to set up the project on your local machine for development and testing purposes.

Prerequisites
Python (3.x recommended)
Django
React
Node.js and npm
Setting Up the Environment
Clone the repository

bash
Copy code
git clone https://github.com/freakbeast14/Kaizntree.git
cd Kaizntree
Set up a virtual environment

bash
Copy code
python -m venv venv
Activate the virtual environment:
On Windows:

Copy code
venv\Scripts\activate
On macOS and Linux:

bash
Copy code
source venv/bin/activate
Install backend dependencies

Copy code
pip install -r requirements.txt
Set up environment variables
Create a .env file in the root of the Django project and add the following:

makefile
Copy code
SECRET_KEY=your_django_secret_key
DEBUG=True # Set to False in production
Replace your_django_secret_key with your actual Django secret key.

Install frontend dependencies
Navigate to the React app directory (assuming it's named frontend):

bash
Copy code
cd kaizntree_frontend
npm install
Running the Application
Start the Django backend server
Navigate back to the Django project root directory and run:

Copy code
python manage.py runserver
Start the React frontend
In a new terminal, navigate to the React app directory and start the React development server:

sql
Copy code
npm start
This should open your default web browser and navigate to http://localhost:3000, where you can interact with the application.

API Documentation
You can access the Kaizntree API Documentation here.

Running Unit Tests for API endpoints
Navigate back to the Django project root directory and run unit tests for the API endpoints using the following command:

bash
Copy code
python manage.py test