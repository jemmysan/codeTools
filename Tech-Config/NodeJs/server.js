import 'dotenv/config'
import connectDB from './config/db.js';
import express from 'express';
import cors from  'cors'
import helmet from "helmet";
import morgan from 'morgan';  
import {errorHandler} from './middlewares/error.middleware.js'
import authRouter from './routes/auth.router.js';
import categoryRouter from './routes/category.router.js';
import { bookRouter } from './routes/book.router.js';



// Initialisation
connectDB(); // Connexion to MongoDB
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/books', bookRouter);


// Error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
