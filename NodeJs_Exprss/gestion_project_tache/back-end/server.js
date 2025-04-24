import 'dotenv/config'
import express from 'express';
import cors from  'cors'
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';


// Initialisation
connectDB(); // Connexion to MongoDB
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRouter);

// Error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
