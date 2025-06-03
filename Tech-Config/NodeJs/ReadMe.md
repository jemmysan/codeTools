/------  Project Documentation  ------/
- # I- Technologies
    - React.js
    - Node.js
    - Express.js
    - MongoDB (avec Mongoose)
    - JWT pour l'authentification

- # II- Installation
    - # A- Environment
        - npm init -y
        - npm install
        - server.js / index.js

    - # B- Dependances 
        - express
        - mongodb
        - mongoose
        - nodemon
        - dotenv
        - bcryptjs
        - cors
        - express-joi-validations
        - jsonwebtoken
        - helmet
        - morgan


- # III- Structure du Project
    # - Back-End
        - .env :
            PORT=3000
            MONGO_URI=
            JWT_SECRET=
            
        - package-json : 
            ....,
            "main": "server.js",
            "type": "module",
            "scripts": {
                ...,
                "serve": "node server.js",
                "dev": "nodemon server.js"
            },

        - Folders : 
            - config
            - middlewares
            - models
            - controllers
            - routes
            - utils
