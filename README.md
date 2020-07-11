# FOOD LUST Webapp

An Online food Ordering app

### Runing the Foodlust website on your system:

1. Make sure you have Python 3 and pip setup on your computer.
2. Make sure you have Node js and npm setup on your computer.
3. Create a file named .env for enviroment variables in the root folder and it should be like this:

```
HOST_USER_EMAIL= test@example.com
HOST_USER_PASSWORD= password123
DEBUG= True

PAYU_MERCHANT_KEY = <MERCHANT KEY>
PAYU_MERCHANT_SALT = <MERCHANT SALT>
PAYU_MODE = <TEST / LIVE>
```

4. Install virtual env with : "pip install virtualenv"
5. Create a virtua env with : "virtualenv env"
6. Activate the env with : "env\Scripts\activate.bat" for windows, while "env\bin\activate.bat" for linux or mac.
7. Install python dependencies : "pip install -r requirements.txt"
8. Migrate : "manage.py migrate"
9. Create a super user : "manage.py createsuperuser" and then enter username, password and email.

10. Install Node dependencies : "npm install"
11. Build : "npm run build"

12. Run server : "manage.py runserver"

The server will be live at [localhost:8000](http://localhost:8000)
