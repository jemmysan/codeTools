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
    <div className="missions-card" style={styles.card}>
      {/* Header */}
      <div className="card-header" style={styles.headerContainer}>
        <h3 style={styles.title}>Missions</h3>
        <div className="search-container" style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Barre de filtres */}
      <div className="filter-bar" style={styles.filterBar}>
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => {
              setActiveFilter(status);
              if (status === "Tous") onMissionSelect(null);
            }}
            style={styles.filterChip(activeFilter === status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Liste des missions */}
      <div style={styles.list}>
        {filteredMissions.map((mission) => {
          const isActive = activeMissionId === mission.id;
          return (
            <div 
              key={mission.id} 
              className="mission-item"
              onClick={() => onMissionSelect(mission)}
              style={styles.item(isActive, mission.color)}
            >
              <div style={styles.leftPart}>
                <div style={{ ...styles.statusBox, backgroundColor: mission.color }}>
                  <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
                </div>
                <span style={styles.name(isActive, mission.color)}>{mission.name}</span>
              </div>
              
              <div className="mission-details" style={styles.rightPart}>
                <span style={styles.statusBadge(mission.color)}>{mission.status}</span>
                <span style={styles.hours}>🕒 {mission.hours}</span>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .card-header { flex-direction: column; align-items: flex-start !important; gap: 15px; }
          .search-container { width: 100% !important; }
          .mission-item { flex-direction: column; align-items: flex-start !important; gap: 10px; }
          .mission-details { width: 100%; justify-content: space-between; margin-top: 5px; }
          .filter-bar { overflow-x: auto; white-space: nowrap; padding-bottom: 10px; -webkit-overflow-scrolling: touch; }
        }
      `}</style>
    </div>
  );
}

// --- OBJET DE STYLES (Style React) ---

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    marginTop: "20px",
    width: "100%",
    boxSizing: "border-box"
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  title: { fontSize: "18px", fontWeight: "700", margin: 0 },
  searchContainer: {
    position: "relative",
    width: "auto",
    minWidth: "180px"
  },
  searchIcon: { position: "absolute", left: "10px", top: "8px" },
  searchInput: {
    padding: "8px 12px 8px 30px",
    borderRadius: "10px",
    border: "1px solid #eee",
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
  },
  filterBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  filterChip: (isActive) => ({
    padding: "6px 15px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
    backgroundColor: isActive ? "#4f46e5" : "#f3f4f6",
    color: isActive ? "white" : "#6b7280",
  }),
  list: { display: "flex", flexDirection: "column", gap: "10px" },
  item: (isActive, color) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    cursor: "pointer",
    borderRadius: "16px",
    transition: "0.2s",
    marginBottom: "8px",
    backgroundColor: isActive ? `${color}15` : "transparent",
    borderLeft: isActive ? `5px solid ${color}` : "5px solid transparent",
  }),
  leftPart: { display: "flex", alignItems: "center", gap: "12px" },
  statusBox: {
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  name: (isActive, color) => ({
    fontWeight: "600",
    color: isActive ? color : "#374151"
  }),
  rightPart: { display: "flex", alignItems: "center", gap: "15px" },
  statusBadge: (color) => ({
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "11px",
    fontWeight: "700",
    backgroundColor: `${color}20`,
    color: color
  }),
  hours: { fontSize: "13px", color: "#9ca3af" }
};