import React, { useState } from 'react';

export default function SiteFormPopUp({ isOpen, onClose, onSave, site }) {
  // ✅ On initialise directement. Pas de useEffect ici.
  const [formData, setFormData] = useState({
    name: site?.name || "",
    color: site?.color || "#4f46e5"
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>{site ? "Modifier" : "Ajouter"} le site</h2>
        <form onSubmit={handleSubmit}>
          <div style={groupStyle}>
            <label style={labelStyle}>Nom du lieu</label>
            <input 
              style={inputStyle} 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Couleur identification</label>
            <input 
              type="color" 
              style={colorInputStyle} 
              value={formData.color} 
              onChange={e => setFormData({...formData, color: e.target.value})} 
            />
          </div>
          <div style={footerStyle}>
            <button type="button" onClick={onClose} style={cancelBtn}>Annuler</button>
            <button type="submit" style={saveBtn}>Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Les objets de styles restent identiques
const overlayStyle = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 };
const modalStyle = { backgroundColor: "white", padding: "30px", borderRadius: "24px", width: "400px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" };
const titleStyle = { marginBottom: "20px", fontWeight: "800", color: "#1e293b" };
const groupStyle = { marginBottom: "15px" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "5px", color: "#64748b" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", boxSizing: "border-box", outline: "none" };
const colorInputStyle = { width: "100%", height: "40px", border: "1px solid #e2e8f0", borderRadius: "10px", cursor: "pointer" };
const footerStyle = { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" };
const saveBtn = { backgroundColor: "#4f46e5", color: "white", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: "600", cursor: "pointer" };
const cancelBtn = { background: "none", border: "1px solid #e2e8f0", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", color: "#64748b" };