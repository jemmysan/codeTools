import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import ErrorHandler from './errorHandler.js';
import { catchAsyncError } from './catchAsyncError.js';

// Déclaration du model Utilisateur
const User = db.User; 

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    // Récupérer le token depuis les cookies
    const { token } = req.cookies;

    // Vérifier si le token existe
    if (!token) {
        return next(new ErrorHandler("Veuillez vous connecter pour accéder à cette ressource", 401));
    }

    // Décoder et vérifier le token
    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        // Ajouter l'utilisateur à l'objet 'req' pour qu'il soit accessible partout
        req.user = await User.findByPk(decodedData.id);

        if (!req.user) {
            return next(new ErrorHandler("Utilisateur non trouvé", 404));
        }

        next(); // On passe à la suite (le contrôleur)
    } catch (error) {
        return next(new ErrorHandler("Token invalide ou expiré", 401));
    }
});

// Optionnel : Middleware pour restreindre par rôle (ex: Admin uniquement)
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Le rôle (${req.user.role}) n'est pas autorisé à accéder à cette ressource`, 403));
        }
        next();
    };
};