import React, { useState } from "react";
import moment from "moment";

export default function EventPopUp({ isOpen, onClose, onSave, onDelete, date, event }) {
  const [title, setTitle] = useState(event?.title || "");
  const [start, setStart] = useState(
    event ? moment(event.start).format("YYYY-MM-DDTHH:mm") : 
    date ? moment(date).format("YYYY-MM-DDTHH:mm") : ""
  );
  const [end, setEnd] = useState(
    event ? moment(event.end).format("YYYY-MM-DDTHH:mm") : 
    date ? moment(date).add(1, 'hour').format("YYYY-MM-DDTHH:mm") : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: event?.id,
      title,
      start: new Date(start),
      end: new Date(end),
    });
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Bouton Fermer en haut à droite */}
        <button onClick={onClose} style={closeButtonStyle}>✕</button>
        
        <h2 style={headerStyle}>{event ? "Modifier la tâche" : "Nouvel événement"}</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Titre du projet</label>
            <input
              type="text"
              placeholder="Design Responsive..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Début</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Fin</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={footerStyle}>
            {event && (
              <button type="button" onClick={() => onDelete(event.id)} style={deleteButtonStyle}>
                Supprimer
              </button>
            )}
            <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
              <button type="button" onClick={onClose} style={cancelButtonStyle}>Annuler</button>
              <button type="submit" style={saveButtonStyle}>Enregistrer</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- STYLES OBJECTS ---

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(4px)", // Effet de flou sur l'arrière-plan
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "32px",
  borderRadius: "24px", // Bords très arrondis comme sur l'image
  width: "450px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  position: "relative",
  fontFamily: "'Inter', sans-serif",
};

const headerStyle = {
  fontSize: "22px",
  fontWeight: "700",
  marginBottom: "24px",
  color: "#1a1a1a",
};

const closeButtonStyle = {
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "none",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  color: "#9ca3af",
};

const inputGroupStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#6b7280",
  marginBottom: "8px",
  marginLeft: "4px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  backgroundColor: "#f9fafb",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const footerStyle = {
  display: "flex",
  alignItems: "center",
  marginTop: "30px",
};

const saveButtonStyle = {
  backgroundColor: "#4f46e5", // Couleur Indigo
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)",
};

const cancelButtonStyle = {
  backgroundColor: "transparent",
  color: "#6b7280",
  border: "1px solid #e5e7eb",
  padding: "12px 20px",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

const deleteButtonStyle = {
  color: "#ef4444",
  background: "none",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};