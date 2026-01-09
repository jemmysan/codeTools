import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const routes = express.Router();

// Test server
routes.get('/', (req, res) => {
  res.send('Server is running...');
});

// Inscription
routes.post('/register', register);

// Connexion
routes.post('/login', login);

// Déconnexion
routes.get('/logout',isAuthenticated, logout);

// Verification de l'utilisateur connecté
routes.get('/me', isAuthenticated, getMyProfile)

export default routes;