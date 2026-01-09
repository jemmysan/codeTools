import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorHandler.js';
import routes from './api/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// === - CREATE SERVER - === 
const  app = express();
dotenv.config({ path: path.join(__dirname, './.env') });

// === - MIDDLEWARES ===
app.use(cors({
    origin: process.env.CLIENT_URL, // Autorise uniquement le frontend
    credentials: true // Permet le navigateur d'envoyer/recevoir les cookies
}));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

// === - ROUTES - ===
// api enpoind
app.use('/api/auth', routes)



// === - ERROR HANDLING - ===
app.use(errorMiddleware);



// === - Export of app - === 
export default app;
