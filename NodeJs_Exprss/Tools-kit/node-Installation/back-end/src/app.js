import express from "express";
import dotenv from 'dotenv';
import helmet from "helmet";
import cors from 'cors';
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/errorHandler.js";
import connectToDB from "./database/db.js";


// === - CREATE SERVER === 
const  app = express();
dotenv.config({path : './.env'})

// === - MIDDLEWARES ===
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

// === - ROUTES ===
// Base Route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Routes API

// === - CONNECTION TO DATABASE ===
connectToDB();

// === - ERROR HANDLING ===
app.use(errorMiddleware);


// === Exportation de app === 
export default app;
