# - I- npm init -y
        - 1- set the db.js
        - 2 - set the server.js
        - 3 - set app.js
# - II- Set the database with mongodb
        - npm i express
        - Install mongodb
        - Install mogoose
# - III- create app.js file for entry point
    A- Config it by adding the express config 
    - go to npm.com and type express and follow the installation
# - IV- install
  - npm i nodemon -D : to set your dev environment
# - V- add configuration to the package.json
     "scripts": {
    .....
    "serve": "node app.js",
    "dev": "nodemon app.js"
  },


  - Or npm install --save-dev nodemon

# - VI- Set the dependancies
  - Install dotenv 
  - Install cors
  - crypto-js
  - cookie-parser
  - nodemon
  - helmet
 

# - VII- Structuring folders 
  1- Create middleware Error
  2- Create middleware Validate
  3- Create Validation
    - a npm i express-joi-validations
  4- Create Models
  5- Create Controllers
   - Create Routes

# - VIII Launch application
  - Change : "type": "module",  ----> if you want use  import and export
  - npm run dev