import jwt from 'jsonwebtoken';

export const sendToken = (user, statusCode, res) => {
    // Création du token signé avec votre JWT_SECRET
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    // Configuration des options du cookie
    const cookieOptions = {
        expires: new Date(
            Date.now() + (parseInt(process.env.COOKIE_EXPIRES_IN) || 1) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Empêche l'accès au cookie via JavaScript (Protection XSS)
        secure: process.env.NODE_ENV === 'production', // Cookie envoyé uniquement en HTTPS en prod
        sameSite: 'Lax', // Protection contre les attaques CSRF
    };

    // Suppression du mot de passe de la réponse JSON pour la sécurité
    user.password = undefined;

    res.status(statusCode).cookie('token', token, cookieOptions).json({
        success: true,
        user,
        token,
    });
};