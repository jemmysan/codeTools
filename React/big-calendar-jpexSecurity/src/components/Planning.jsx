import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';

// --- CONFIGURATION DES DONNÉES (Prêt pour l'API) ---
const CURRENT_YEAR = 2026;

// Liste des Lieux (Missions)
const MISSIONS_LIST = [
  { id: "site_01", name: "MANSA" },
  { id: "site_02", name: "SITE ALPHA" },
  { id: "site_03", name: "SITE BETA" },
  { id: "site_04", name: "ENTREPOT GAMMA" }
];

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DAYS = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];

// Structure de données simulant une réponse API
const STATIC_SCHEDULE_STORE = [
  {
    id: "plan_101",
    missionId: "site_01", // Référence à MANSA
    month: "Janvier",
    label: "Semaine du 26 au 01 Février",
    startDate: "2026-01-26",
    endDate: "2026-02-01",
    days: [
      { 
        day: "LUNDI", 
        agents: [
          { Nom: "Jean D.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#E3F2FD", textColor: "#1E88E5" }
        ] 
      }
    ]
  },
  {
    id: "plan_102",
    missionId: "site_01",
    month: "Janvier",
    label: "Semaine du 12 au 18 Janvier",
    startDate: "2026-01-12",
    endDate: "2026-01-18",
    days: [
      { 
        day: "MARDI", 
        agents: [
          { Nom: "Yass", role: "SSIAP 1", start: "20:00", end: "08:00", color: "#EDE7F6", textColor: "#5E35B1" }
        ] 
      }
    ]
  }
];

// --- COMPOSANTS INTERNES ---

const PlanningTable = ({ activeWeek, isFullSize }) => (
  <div className={`table-wrapper ${isFullSize ? 'full' : 'preview'}`}>
    <table className="planning-grid">
      <thead>
        <tr>{DAYS.map(d => <th key={d}>{d}</th>)}</tr>
      </thead>
      <tbody>
        <tr>
          {DAYS.map(day => {
            const dayData = activeWeek?.days?.find(d => d.day === day);
            return (
              <td key={day} className="grid-cell">
                {dayData?.agents.map((agent, i) => (
                  <div key={i} className="agent-ticket" style={{ borderTop: `4px solid ${agent.textColor}`, backgroundColor: agent.color }}>
                    <div className="agent-title">{agent.Nom}</div>
                    <div className="agent-sub">{agent.role}</div>
                    <div className="agent-timer">{agent.start} - {agent.end}</div>
                  </div>
                ))}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  </div>
);

// --- COMPOSANT PRINCIPAL ---

export default function GlobalPlanning() {
  const [activeMissionId, setActiveMissionId] = useState(MISSIONS_LIST[0].id);
  const [activeMonth, setActiveMonth] = useState(MONTHS[new Date().getMonth()]);
  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef(null);

  // LOGIQUE DE CALCUL DES DONNÉES (Simule le filtrage Back-end)
  const weeksAvailable = STATIC_SCHEDULE_STORE.filter(plan => 
    plan.missionId === activeMissionId && plan.month === activeMonth
  );

  let activeWeek = weeksAvailable.find(w => w.id === selectedWeekId);
  
  if (!activeWeek && weeksAvailable.length > 0) {
    const today = new Date();
    activeWeek = weeksAvailable.find(w => today >= new Date(w.startDate) && today <= new Date(w.endDate)) || weeksAvailable[0];
  }

  const currentMission = MISSIONS_LIST.find(m => m.id === activeMissionId);
  const filteredMissions = MISSIONS_LIST.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      scrollRef.current.scrollTo({ left: direction === 'left' ? scrollLeft - 150 : scrollLeft + 150, behavior: 'smooth' });
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');
    html2pdf().from(element).set({
      margin: 10,
      filename: `Planning_${currentMission.name}_${activeWeek?.label}.pdf`,
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    }).save();
  };

  return (
    <div className="dashboard">
      <div className="top-nav no-print">
        <div className="brand-zone"><h1>MANSA DASHBOARD</h1></div>
        <div className="controls-zone">
          <div className="month-navigation">
            <button className="nav-btn" onClick={() => scroll('left')}>‹</button>
            <div className="month-carousel" ref={scrollRef}>
              {MONTHS.map(m => (
                <div 
                  key={m} 
                  className={`month-pill ${activeMonth === m ? 'active' : ''}`} 
                  onClick={() => { setActiveMonth(m); setSelectedWeekId(null); }}
                >
                  {m}
                </div>
              ))}
            </div>
            <button className="nav-btn" onClick={() => scroll('right')}>›</button>
          </div>
          <div className="week-dropdown-box">
            <select className="styled-select" value={activeWeek?.id || ""} onChange={(e) => setSelectedWeekId(e.target.value)}>
              {weeksAvailable.length > 0 ? (
                weeksAvailable.map(w => <option key={w.id} value={w.id}>{w.label}</option>)
              ) : (
                <option value="">Aucun planning disponible</option>
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="main-layout">
        <aside className="week-sidebar no-print">
          <div className="sidebar-header">
            <h3>Lieux (Missions)</h3>
            <div className="search-box">
              <input type="text" placeholder="🔍 Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="week-items-container">
            {filteredMissions.map(mission => (
              <div 
                key={mission.id} 
                className={`week-selector ${activeMissionId === mission.id ? 'active' : ''}`} 
                onClick={() => { setActiveMissionId(mission.id); setSelectedWeekId(null); }}
              >
                <span className="week-label">{mission.name}</span>
                <span className="chevron">›</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="planning-view">
          {activeWeek ? (
            <div className="planning-paper" onClick={() => setIsModalOpen(true)}>
              <div className="paper-overlay"><span>Cliquer pour Télécharger PDF</span></div>
              <div className="paper-header">
                <h2>{currentMission.name}</h2>
                <p className="week-subtitle">{activeWeek.label}</p>
              </div>
              <PlanningTable activeWeek={activeWeek} isFullSize={false} />
            </div>
          ) : (
            <div className="empty-state">
              <h3>Aucun planning pour {currentMission.name} en {activeMonth}</h3>
              <p>Veuillez sélectionner une autre période.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-nav">
              <h2>Aperçu Export : {currentMission.name}</h2>
              <div className="modal-btns">
                <button className="download-btn" onClick={handleDownloadPDF}>📥 PDF</button>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>Fermer</button>
              </div>
            </div>
            <div className="modal-body" id="pdf-content">
              <h1 style={{color: '#4f46e5'}}>PLANNING MANSA</h1>
              <h2 style={{color: '#334155'}}>{currentMission.name}</h2>
              <p>{activeWeek?.label} - {CURRENT_YEAR}</p>
              <PlanningTable activeWeek={activeWeek} isFullSize={true} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dashboard { height: 100vh; display: flex; flex-direction: column; background: #f4f6f9; font-family: 'Segoe UI', sans-serif; overflow: hidden; }
        .top-nav { background: white; border-bottom: 1px solid #e1e4e8; padding: 10px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-zone h1 { font-size: 1.1rem; color: #4f46e5; font-weight: 900; }
        .controls-zone { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
        .month-navigation { display: flex; align-items: center; gap: 5px; }
        .nav-btn { background: #f1f5f9; border: none; color: #4f46e5; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-weight: bold; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .month-carousel { display: flex; gap: 6px; overflow-x: hidden; scroll-behavior: smooth; max-width: 400px; }
        .month-pill { padding: 4px 12px; background: #f1f5f9; border-radius: 20px; font-size: 0.75rem; font-weight: 700; cursor: pointer; flex-shrink: 0; }
        .month-pill.active { background: #4f46e5; color: white; }
        .styled-select { width: 250px; padding: 6px 12px; border-radius: 8px; border: 1px solid #ddd; background: #f8fafc; font-weight: 600; cursor: pointer; }
        .main-layout { display: flex; flex: 1; overflow: hidden; }
        .week-sidebar { width: 300px; background: white; border-right: 1px solid #e1e4e8; display: flex; flex-direction: column; }
        .sidebar-header { padding: 15px 20px; border-bottom: 1px solid #f0f0f0; }
        .search-box input { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 0.85rem; outline: none; }
        .week-items-container { flex: 1; overflow-y: auto; padding: 15px; }
        .week-selector { display: flex; justify-content: space-between; align-items: center; padding: 14px; border-radius: 12px; cursor: pointer; margin-bottom: 10px; background: #fafafa; border: 1px solid #eee; transition: 0.2s; }
        .week-selector.active { background: #4f46e5; color: white; border-color: #4f46e5; }
        .week-label { font-weight: 700; font-size: 0.85rem; }
        .planning-view { flex: 1; padding: 30px; overflow-y: auto; display: flex; justify-content: center; }
        .planning-paper { background: white; padding: 30px; border-radius: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.05); cursor: pointer; position: relative; width: 100%; max-width: 1000px; height: fit-content; }
        .paper-overlay { position: absolute; inset: 0; background: rgba(79, 70, 229, 0.04); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.2s; border-radius: 20px; z-index: 5; }
        .planning-paper:hover .paper-overlay { opacity: 1; }
        .paper-overlay span { background: #4f46e5; color: white; padding: 10px 20px; border-radius: 30px; font-weight: bold; }
        .planning-grid { width: 100%; border-collapse: separate; border-spacing: 5px; }
        .planning-grid th { padding: 12px; background: #f1f5f9; border-radius: 6px; font-size: 0.7rem; color: #64748b; text-transform: uppercase; }
        .grid-cell { vertical-align: top; background: #fff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 5px; min-height: 120px; }
        .agent-ticket { padding: 10px; border-radius: 6px; margin-bottom: 5px; font-size: 0.8rem; }
        .agent-title { font-weight: 800; }
        .agent-timer { font-size: 0.7rem; font-weight: bold; margin-top: 5px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 5px; }
        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; width: 95%; height: 90vh; border-radius: 20px; display: flex; flex-direction: column; overflow: hidden; }
        .modal-nav { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .download-btn { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        .close-btn { background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-left: 10px; }
        .modal-body { flex: 1; overflow-y: auto; padding: 40px; text-align: center; }
        .empty-state { padding: 40px; text-align: center; color: #64748b; }
      `}</style>
    </div>
  );
}