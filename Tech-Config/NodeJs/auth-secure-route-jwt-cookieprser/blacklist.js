import { InvalidatedToken } from "../../models/InvalidatedToken.model";

export const blacklistToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const expiresAt = new Date(decoded.exp * 1000);
        
        if (expiresAt < new Date()) {
            expiresAt = new Date(Date.now() + 3600000); 
        }

        await InvalidatedToken.create({ token, expiresAt });
    } catch (error) {
        console.error("Blacklist error:", error);
        throw error;
    }
};