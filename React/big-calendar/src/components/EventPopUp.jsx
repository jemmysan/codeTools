import React, { useState } from "react";
import moment from "moment";

export default function EventPopUp({isOpen, onClose, onSave, onDelete, date, event}) {
 // On initialise l'état directement avec les valeurs existantes ou par défaut
  const [title, setTitle] = useState(event?.title || "");
  
  // Formatage pour l'input datetime-local (YYYY-MM-DDTHH:mm)
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <h2>{event ? "Edit" : "Add event"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
            />

            <label>Start:</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
            />

            <label>End:</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
            />
          <button type='submit' style={{marginRight: "10px", marginTop:"15px"}}>Save</button>
          <button type='button' onClick={onClose}>Cancel</button>

          {/* ✅ Bouton Supprimer (affiché seulement si l'événement existe) */}
            {event && (
              <button 
                type="button" 
                onClick={() => onDelete(event.id)}
                style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
              >
                Supprimer
              </button>
            )}
          </div>


        </form>
      </div>
    </div>
  );
}
