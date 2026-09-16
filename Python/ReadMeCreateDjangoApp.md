
# ---- Création et lancement -----


# 1.  - Création 
    - a - Création du dossier nom_dossier_app
    - b - Créer l'environnement virtuel dans le dossier : 
        python -m venv venv
     - b - Active l'environnement virtuel : 
        source venv/bin/activate : si sur Mac

# 2. Installation des dépendances
        Créer le fichier requirements.txt
        Ajoute les des dépendances dans requirements.txt et avant de taper la commande : 
        pip install -r requirements.txt

# 3. Initialisation du projet Django
        django-admin startproject config (ou le nom souhaité) . dans le dossier source nom_dossier_app

# 4. Initialisation le projet
    - python manage.py startapp nom_app

# 5.  Configuration (config/settings.py) si vous utilisez rest_framework 

    INSTALLED_APPS = [
        ....

        # Third-party packages
        'rest_framework',

        # Local apps
        'tasks',
    ]

    REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
}

# 6. Lancement du server : 
    - python manage.py runserve

# 7. Arretez le serveur
    - ctrl + c

# 8. Désactivation l'environnement virtuel
    - deactivate