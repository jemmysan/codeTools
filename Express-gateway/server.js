import { join } from 'path';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
import gateway from 'express-gateway';

// Ces deux lignes recréent le comportement de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

gateway()
  .load(join(__dirname, 'config'))
  .run();