import 'dotenv/config'
import connectDB from '../src/config/db.js';
import express from 'express';
import cors from  'cors'
import helmet from "helmet";
import morgan from 'morgan';




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




// Error handler


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}/api/`));
