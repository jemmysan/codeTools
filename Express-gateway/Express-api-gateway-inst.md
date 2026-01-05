# ----- INSTALLATION ---------
1- Install express-gateway globally 
    - npm install -g express-gateway
2- Intiate gateway project
    - eg gateway create
3- Launch the server by typing :
    - npm start
4- Config the routes to apiendpoints
    example: 
        auth:
        host: localhost
        methods : 'GET,POST,PUT,PATCH,DELETE'
        paths: '/auth*'
5- Set service endpoints
    authService:
    url: 'https://localhost:5000'
6- Set the pipelines
    example : 
        authentification:
        apiEndpoints:
        - auth
        policies:
        # Uncomment `key-auth:` when instructed to in the Getting Started guide.
        # - key-auth:
        - proxy:
            - action:
                serviceEndpoint: authentificationService 
                changeOrigin: true
