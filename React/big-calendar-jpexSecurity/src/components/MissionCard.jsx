import React, { useState } from 'react';

const missionsData = [
  { id: 1, name: "Mansa", status: "En cours", hours: "12h00", color: "#4f46e5" },
  { id: 2, name: "Refonte API", status: "Terminé", hours: "05h30", color: "#10b981" },
  { id: 3, name: "Design System", status: "À venir", hours: "00h00", color: "#f59e0b" }
];

const statuses = ["Tous", "En cours", "Terminé", "À venir"];

export default function MissionsCard({ onMissionSelect, activeMissionId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filteredMissions = missionsData.filter(mission => {
    const matchesSearch = mission.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeFilter === "Tous" || mission.status === activeFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="missions-card" style={cardStyle}>
      {/* Header avec FlexWrap pour mobile */}
      <div className="card-header" style={headerContainerStyle}>
        <h3 style={titleStyle}>Missions</h3>
        <div style={searchContainerStyle}>
          <span style={searchIconStyle}>🔍</span>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
        </div>
      </div>

      {/* Barre de filtres scrollable horizontalement sur mobile */}
  
<div style={filterBarStyle}>
  {statuses.map(status => (
    <button
      key={status}
      onClick={() => {
        setActiveFilter(status);
        if (status === "Tous") {
          onMissionSelect(null); // ✅ On signale au calendrier de tout afficher
        }
      }}
      style={{
        ...filterChipStyle,
        backgroundColor: activeFilter === status ? "#4f46e5" : "#f3f4f6",
        color: activeFilter === status ? "white" : "#6b7280",
      }}
    >
      {status}
    </button>
  ))}
</div>

      <div style={listStyle}>
        {filteredMissions.map((mission) => {
          const isActive = activeMissionId === mission.id;
          return (
            <div 
              key={mission.id} 
              className="mission-item"
              onClick={() => onMissionSelect(mission)}
              style={{
                ...itemStyle,
                backgroundColor: isActive ? `${mission.color}15` : "transparent",
                borderLeft: isActive ? `5px solid ${mission.color}` : "5px solid transparent",
              }}
            >
              <div style={leftPartStyle}>
                <div style={{ ...statusBoxStyle, backgroundColor: mission.color }}>
                  <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
                </div>
                <span style={{ ...nameStyle, color: isActive ? mission.color : "#374151" }}>{mission.name}</span>
              </div>
              
              <div className="mission-details" style={rightPartStyle}>
                <span style={{ ...statusBadgeStyle, backgroundColor: `${mission.color}20`, color: mission.color }}>{mission.status}</span>
                <span style={hoursStyle}>🕒 {mission.hours}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Styles CSS injectés pour la réactivité sans fichier externe */}
      <style>{`
        @media (max-width: 600px) {
          .card-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 15px;
          }
          .search-container {
            width: 100% !important;
          }
          .mission-item {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 10px;
          }
          .mission-details {
            width: 100%;
            justify-content: space-between;
            margin-top: 5px;
          }
          .filter-bar {
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
}

// --- STYLES MIS À JOUR POUR LA RÉACTIVITÉ ---

const cardStyle = { 
  backgroundColor: "white", 
  borderRadius: "24px", 
  padding: "24px", 
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)", 
  marginTop: "20px",
  width: "100%",
  boxSizing: "border-box"
};

const headerContainerStyle = { 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  marginBottom: "20px" 
};

const searchContainerStyle = { 
  position: "relative",
  width: "auto", // S'adaptera via la media query
  minWidth: "180px"
};

const filterBarStyle = { 
  display: "flex", 
  gap: "10px", 
  marginBottom: "20px",
  scrollbarWidth: "none", // Cache la scrollbar sur Firefox
};

const itemStyle = { 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center",
  padding: "12px",
  cursor: "pointer",
  borderRadius: "16px",
  transition: "0.2s",
  marginBottom: "8px"
};
// Styles (simplifiés pour l'exemple)
const titleStyle = { fontSize: "18px", fontWeight: "700" };

const searchInputStyle = { padding: "8px 12px 8px 30px", borderRadius: "10px", border: "1px solid #eee", outline: "none" };
const searchIconStyle = { position: "absolute", left: "10px", top: "8px" };
const filterChipStyle = { padding: "6px 15px", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: "600" };
const listStyle = { display: "flex", flexDirection: "column", gap: "10px" };

const leftPartStyle = { display: "flex", alignItems: "center", gap: "12px" };
const statusBoxStyle = { width: "24px", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" };
const nameStyle = { fontWeight: "600" };
const rightPartStyle = { display: "flex", alignItems: "center", gap: "15px" };
const statusBadgeStyle = { padding: "4px 10px", borderRadius: "15px", fontSize: "11px", fontWeight: "700" };
const hoursStyle = { fontSize: "13px", color: "#9ca3af" };