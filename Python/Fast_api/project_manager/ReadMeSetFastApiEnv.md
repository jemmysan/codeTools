# Step 1 : Fundations
- Environment & settings
    - a) install uv with pip : 
        pip install uv
    - b) Initiate the project 
        uv init project_name 
    - c) cd project_name 
    - d) Install fastapi packages and required tools :
        uv add "fastapi[standard]"
    - Acivate venv
         source .venv/bin/activate
# Step 2 - Add Dependences
- Past : 
    uv add motor pydantic-settings python-dotenv "passlib[bcrypt]" pyjwt
    

# - Step - Arborescence
    mkdir -p src/project_name/{core,db,models,schemas,routers}

# - Setting - .env
    PROJECT_NAME="Project Manager API"
    MONGO_URI="mongodb+srv://<TON_UTILISATEUR>:<TON_MOT_DE_PASSE>@app-database.xjtv4qh.mongodb.net/?retryWrites=true&w=majority"
    MONGO_DB_NAME="taskflow_db"

# - Setting - Database
- a) /core/config.py
- b) /db/mongodb.py
- c) /main.py

# - Test Validation
- if you use src and don't want add : --app-dir src
- install : uv pip install -e 
- uv run uvicorn project_manager.main:app --reload
- launch : http://127.0.0.1:8000/docs test /health


# - Development
- 1 - Model
- 2 - Schema
- 3 - Dto
- 4 - Ajouter le Hachage des Mots de Passe
- 5 - Implémenter le Router Utilisateurs

# - Authentification functionality
- install  : uv add pyjwt python-multipart