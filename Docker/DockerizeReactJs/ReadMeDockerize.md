# --- Dockerized Existing Project ----- 
- ReactJs 
# -- Option 1----
    - 1- Create Dockerfile to root of the project
    - 2- Edit the docker file by adding commande
    - 3- Create a .dockerignore file and and node_modules/
    - 4- Go to package.json and modify by replace the to expose the port
        * "dev": "vite --host",
    - 5- Build the docker image
        * docker build -t name_the_image .
        - to avoid port expose error run : (if you want run and build as the same time)
            * docker run -p 5173:5173 name_of_the_image
        - to tell docker mount the current directory inside the container to see onlive any change (volumes) includes dependancies
            * docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules name_of_the_image

# -- Option 2----
    - Run in the root folder : 
        * docker init
            - Answer the questions : 
                - a- Node 
                - b- npm 
                - c- no 
                - d - npm run dev
                - e - 5173
    
    ## Si vous avez utilisé docker avec compose.yaml les commandes sont les suivantes :

    # Si vous etes avec vite ajouter : 
                server: {
            host: true, // équivalent de 0.0.0.0
            watch: {
            usePolling: true,
            },
        },
    #--- Construire et démarrer les services :
    # - docker-compose up --build

    #--- Démarrer les services sans reconstruire :
    # - docker-compose up

    #--- Arrêter les services :
    # - docker-compose down

    #--- Docker compose watch pour surveiller les changements
    # - docker compose watch
        

