# ---- Connecting to mongo db-----
    - Install mongo db : npm i mongodb
    - set .env file => MONGO_URI = 'mongo_url'
    - Create /lib/db.js


# ----- Creating session ----- 
    - Install Jose : npm i jose


# ----- Session Cryptage ------
    - Generate a crypto code : 
        node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
    
    - Define session in /lib/sessions.js
    
