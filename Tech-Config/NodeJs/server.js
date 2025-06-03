import 'dotenv/config';
import express from 'express'
import cors from  'cors'
import connectToDB from './config/db.js';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './route/auth.routes.js';
import userRoute from './route/user.routes.js';
import cookieParser from 'cookie-parser';
import { PORT, Router } from './index.js';



// ===  - CREATE SERVER - ===
const app = express();

// ==== - CONNECTION TO DATABASE - =====
connectToDB();

// ==== - MIDDLEWARES - =====
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


// === 4 - CONFIGURE ROUTES ===
// Connect Route handler to server
Router(app);


// Connect Route handler to server in not found route case
// NotFoundRoute(server)

//--- routes ------//

app.use('/api/auth', authRouter);
app.use('/api/users', userRoute)


// Server
app.listen(PORT, ()=> console.log(`App is running on http://localhost:${PORT}`))