import bcrypt from "bcryptjs";
import db from '../models/index.js'
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { sendToken } from "../utils/jwtToken.js";

// Déclaration du model Utilisateur
const User = db.User;

/**
 * @desc    Inscription d'un nouvel utilisateur
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = catchAsyncError(async (req, res, next) => {
    const { firstname, lastname, email, password, role } = req.body;

    // - Vérification des champs obligatoires
    if (!firstname || !lastname || !email || !password) {
        return next(new ErrorHandler("Veuillez remplir tous les champs obligatoires", 400));
    }

    // - Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ where: { email: email.toLowerCase() } });
    if (userExists) {
        return next(new ErrorHandler("Un utilisateur avec cet email existe déjà", 400));
    }

    // - Hachage du mot de passe
    // Le "10" est le coût algorithmique (saltRounds), standard pour l'équilibre sécurité/vitesse
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // - Création de l'utilisateur dans la base PostgreSQL via Sequelize
    const newUser = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || 'user', // 'user' par défaut si non spécifié
    });

    // - Génération du JWT et envoi du Cookie
    sendToken(newUser, 201, res);
});

/**
 * @desc    Connexion de l'utilisateur
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Vérifier si l'email et le mot de passe sont fournis
    if (!email || !password) {
        return next(new ErrorHandler("Veuillez fournir un email et un mot de passe", 400));
    }

    // Trouver l'utilisateur dans la base de données
    // .toLowerCase() est utilisé pour la cohérence avec le register
    const userExists = await User.findOne({ where: { email: email.toLowerCase() } });

    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
        return next(new ErrorHandler("Identifiants incorrects", 401));
    }

    // Si tout est correct, envoyer le token dans un cookie
    sendToken(userExists, 200, res);
});


/**
 * @desc    Déconnexion de l'utilisateur (Suppression du cookie)
 * @route   GET /api/auth/logout
 * @access  Private (ou Public)
 */
export const logout = catchAsyncError(async (req, res, next) => {
    // Configuration pour supprimer le cookie
    const cookieOptions = {
        expires: new Date(Date.now()), // Expire à l'instant présent
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
    };

    res.cookie('token', null, cookieOptions);

    res.status(200).json({
        success: true,
        message: "Déconnexion réussie",
    });
});

/**
 * @desc    Obtenir le profil de l'utilisateur connecté
 * @route   GET /api/me
 * @access  Private (Requiert isAuthenticated)
 */
export const getMyProfile = catchAsyncError(async (req, res, next) => {
    // L'utilisateur est déjà disponible dans req.user grâce au middleware isAuthenticated
    const user = req.user;

    if (!user) {
        return next(new ErrorHandler("Utilisateur non trouvé", 404));
    }

    res.status(200).json({
        success: true,
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }
    });
});