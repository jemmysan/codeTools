import { InvalidatedToken } from "../../models/InvalidatedToken.model.js";
import jwt from 'jsonwebtoken'
import { User } from "../../models/user.model.js";

export const authenticate = async (req, res, next) => {
      try {
        
        if (!req.cookies) {
            return res.status(401).json({
                success: false,
                message: "Cookies not available"
            });
        }

        const token = req.cookies.authToken;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token missing"
            });
        }

        const isBlacklisted = await InvalidatedToken.findOne({ token });
        
        if (isBlacklisted) {
            return res.status(401).json({
                success: false,
                message: "Token invalidated - please login again"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        
        next();
    } catch (error) {
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        
        console.error("Authentication error:", error);
        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });
    }
};