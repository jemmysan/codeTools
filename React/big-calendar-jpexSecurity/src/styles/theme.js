// src/styles/theme.js

export const theme = {
  colors: {
    primary: "#4f46e5",       // Indigo
    primaryLight: "#4f46e515",
    secondary: "#10b981",     // Emeraude
    danger: "#ef4444",        // Rouge
    dangerLight: "#fff1f2",
    warning: "#f59e0b",       // Ambre
    
    // Neutres
    background: "#f1f5f9",
    surface: "#ffffff",
    border: "#e2e8f0",
    
    // Texte
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
  },
  
  borderRadius: {
    small: "8px",
    medium: "12px",
    large: "24px",
    full: "9999px",
  },
  
  shadows: {
    card: "0 10px 30px rgba(0,0,0,0.05)",
    modal: "0 20px 50px rgba(0,0,0,0.1)",
  },

  transitions: {
    default: "0.2s ease-in-out",
  }
};