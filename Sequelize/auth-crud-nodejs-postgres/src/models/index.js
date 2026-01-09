'use strict';

import { pathToFileURL } from 'url';
import { readdirSync, readFileSync } from 'fs'; // Ajout de readFileSync
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize, { DataTypes } from 'sequelize';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Option A: Syntaxe moderne Node 22
import configData from '../config/config.json' with { type: 'json' };
const config = configData[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lecture dynamique des fichiers de modèles
const files = readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  );
});

// Importation dynamique des modèles
for (const file of files) {
  // 2. Utilisez pathToFileURL pour convertir le chemin Windows en URL valide (file:///D:/...)
  const filePath = path.join(__dirname, file);
  const fileUrl = pathToFileURL(filePath).href; 
  
  const modelImport = await import(fileUrl);
  
  const modelFunction = modelImport.default;
  if (typeof modelFunction === 'function') {
    const model = modelFunction(sequelize, DataTypes);
    db[model.name] = model;
  }
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;