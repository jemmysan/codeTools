I- npm init -y
II- npm i express
III- create index.js file for entry point
    A- Config it by adding the express config 
    - go to npm.com and type express and follow the installation
IV- install
  - npm i nodemon -D : to set your dev environment
V- add configuration to the package.json
     "scripts": {
    .....
    "serve": "node index.js",
    "dev": "nodemon index.js"
  },


  - Or npm install --save-dev nodemon

VI- Set your database with mongodb
  - Install mongodb
  - Install mogoose
  - Install cors
  - Install bcryptjs 
  - Intall 
  - Install Joi

VII- Structuring folders 
  1- Create middleware Error
  2- Create middleware Validate
  3- Create Validation
    - a npm i express-joi-validations
  4- Create Models
  5- Create Controllers
   - Create Routes