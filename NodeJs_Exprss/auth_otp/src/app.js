import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import connectToDB from './database/dbConnection.js'
import { errorMiddleware } from './middlewares/errorHandler.js'
import { removeUnverifiedAccounts } from './automation/removeUnverifiedAccounts.js'
import authRouter from './routes/authRoute.js'

// === - CREATE SERVER ===
export const app = express();
dotenv.config({path : './.env'})

// === - MIDDLEWARES ===
// Configuration CORS - Définie AVANT utilisation
// const corsOptions = {
//   origin: `${process.env.FRONT_END_URL}`,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.options('*', cors(corsOptions)); // Pré-vol CORS
// app.use(cors(corsOptions));

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
app.use('/api',authRouter)

// === - Deleting unverified accounts ===
// removeUnverifiedAccounts();

// === - CONNECTION TO DATABASE ===
connectToDB();

// === - ERROR HANDLING ===
app.use(errorMiddleware);

