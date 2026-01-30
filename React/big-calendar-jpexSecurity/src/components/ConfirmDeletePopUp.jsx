import React from 'react';

export default function ConfirmDeletePopUp({ isOpen, onClose, onConfirm, siteName }) {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={{...modalStyle, textAlign: 'center'}}>
        <div style={iconStyle}>⚠️</div>
        <h3 style={{fontWeight: '800'}}>Supprimer le site ?</h3>
        <p style={{color: '#64748b', fontSize: '14px'}}>
          Êtes-vous sûr de vouloir supprimer <strong>{siteName}</strong> ? Cette action est irréversible.
        </p>
        <div style={{...footerStyle, justifyContent: 'center'}}>
          <button onClick={onClose} style={cancelBtn}>Annuler</button>
          <button onClick={onConfirm} style={dangerBtn}>Oui, supprimer</button>
        </div>
      </div>
    </div>
  );
}

const iconStyle = { fontSize: "40px", marginBottom: "15px" };
const dangerBtn = { backgroundColor: "#ef4444", color: "white", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: "600", cursor: "pointer" };

// On réutilise overlayStyle, modalStyle, footerStyle, cancelBtn du fichier précédent

// Styles partagés (reutilisables pour les modales)
const overlayStyle = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 };
const modalStyle = { backgroundColor: "white", padding: "30px", borderRadius: "24px", width: "400px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" };
const footerStyle = { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" };
const cancelBtn = { background: "none", border: "1px solid #e2e8f0", padding: "10px 20px", borderRadius: "10px", cursor: "pointer" };