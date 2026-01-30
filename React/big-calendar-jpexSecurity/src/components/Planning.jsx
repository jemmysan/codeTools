import React, { useState, useRef, useMemo } from 'react';
import html2pdf from 'html2pdf.js';

// --- CONFIGURATION ---
const CURRENT_YEAR = 2026;
const MISSIONS_LIST = [
  { id: "site_01", name: "MANSA" },
  { id: "site_02", name: "SITE ALPHA" },
  { id: "site_03", name: "SITE BETA" },
  { id: "site_04", name: "ENTREPOT GAMMA" }
];
const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DAYS = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];

const STATIC_SCHEDULE_STORE = [
  {
    id: "plan_feb_01",
    missionId: "site_01",
    month: "Février",
    label: "Semaine du 02 au 08 Février",
    days: [
      { 
        day: "LUNDI", date: "2026-02-02", 
        agents: [
          { Nom: "Jean D.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#E3F2FD", textColor: "#1E88E5" },
          { Nom: "Marc L.", role: "ADS", start: "20:00", end: "08:00", color: "#F0F4C3", textColor: "#827717" }
        ] 
      },
      { 
        day: "MERCREDI", date: "2026-02-04", 
        agents: [{ Nom: "Amina K.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#F3E5F5", textColor: "#7B1FA2" }] 
      },
      { 
        day: "SAMEDI", date: "2026-02-07", 
        agents: [{ Nom: "Sophie V.", role: "ADS", start: "07:00", end: "19:00", color: "#E8F5E9", textColor: "#2E7D32" }] 
      }
    ]
  },
  {
    id: "plan_feb_02",
    missionId: "site_01",
    month: "Février",
    label: "Semaine du 09 au 15 Février",
    days: [
      { 
        day: "MARDI", date: "2026-02-10", 
        agents: [{ Nom: "Amina K.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#F3E5F5", textColor: "#7B1FA2" }] 
      },
      { 
        day: "JEUDI", date: "2026-02-12", 
        agents: [
          { Nom: "Jean D.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#E3F2FD", textColor: "#1E88E5" },
          { Nom: "Lucas M.", role: "ADS", start: "20:00", end: "08:00", color: "#FFF3E0", textColor: "#E65100" }
        ] 
      },
      { 
        day: "DIMANCHE", date: "2026-02-15", 
        agents: [{ Nom: "Marc L.", role: "ADS", start: "08:00", end: "20:00", color: "#F0F4C3", textColor: "#827717" }] 
      }
    ]
  },
  {
    id: "plan_feb_03",
    missionId: "site_01",
    month: "Février",
    label: "Semaine du 16 au 22 Février",
    days: [
      { 
        day: "LUNDI", date: "2026-02-16", 
        agents: [{ Nom: "Jean D.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#E3F2FD", textColor: "#1E88E5" }] 
      },
      { 
        day: "VENDREDI", date: "2026-02-20", 
        agents: [
          { Nom: "Amina K.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#F3E5F5", textColor: "#7B1FA2" },
          { Nom: "Sophie V.", role: "ADS", start: "20:00", end: "08:00", color: "#E8F5E9", textColor: "#2E7D32" }
        ] 
      }
    ]
  },
  {
    id: "plan_feb_04",
    missionId: "site_01",
    month: "Février",
    label: "Semaine du 23 au 01 Mars",
    days: [
      { 
        day: "MERCREDI", date: "2026-02-25", 
        agents: [{ Nom: "Lucas M.", role: "ADS", start: "08:00", end: "20:00", color: "#FFF3E0", textColor: "#E65100" }] 
      },
      { 
        day: "SAMEDI", date: "2026-02-28", 
        agents: [
          { Nom: "Jean D.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#E3F2FD", textColor: "#1E88E5" },
          { Nom: "Amina K.", role: "SSIAP 1", start: "20:00", end: "08:00", color: "#F3E5F5", textColor: "#7B1FA2" }
        ] 
      }
    ]
  }
];

// --- COMPOSANT TABLE (Modifié pour afficher tous les jours du mois) ---
const PlanningTable = ({ weeks, isFullSize, filterAgent, viewMode }) => {
  
  // On extrait tous les jours de toutes les semaines disponibles pour ce mois
  const allDays = useMemo(() => {
    if (viewMode === 'week') return weeks[0] ? [weeks[0]] : [];
    
    // En vue mensuelle, on regroupe tous les jours dans un tableau virtuel unique
    return weeks; 
  }, [weeks, viewMode]);

  return (
    <div style={styles.tableWrapper(isFullSize)}>
      {allDays.map((week) => (
        <div key={week.id} style={{ marginBottom: viewMode === 'month' ? '15px' : '0' }}>
          {/* Label de semaine affiché uniquement en vue mensuelle pour séparer les blocs */}
          {viewMode === 'month' && (
            <div style={{ textAlign: 'left', fontSize: '0.8rem', fontWeight: 'bold', color: '#4f46e5', marginBottom: '5px' }}>
              {week.label}
            </div>
          )}
          <table style={styles.planningGrid}>
            <thead>
              <tr>{DAYS.map(d => <th key={d} style={styles.th}>{d}</th>)}</tr>
            </thead>
            <tbody>
              <tr>
                {DAYS.map(day => {
                  const dayData = week?.days?.find(d => d.day === day);
                  const agentsToShow = filterAgent 
                    ? dayData?.agents.filter(a => a.Nom === filterAgent)
                    : dayData?.agents;

                  return (
                    <td key={day} style={styles.gridCell}>
                      {/* Affichage du numéro du jour s'il existe */}
                      {dayData?.date && (
                        <div style={{fontSize: '0.65rem', color: '#94a3b8', marginBottom: '4px'}}>
                          {dayData.date.split('-')[2]}
                        </div>
                      )}
                      {agentsToShow?.map((agent, i) => (
                        <div key={i} style={styles.agentTicket(agent.color, agent.textColor)}>
                          <div style={styles.agentTitle}>{agent.Nom}</div>
                          <div style={styles.agentSub}>{agent.role}</div>
                          <div style={styles.agentTimer}>{agent.start} - {agent.end}</div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
export default function GlobalPlanning() {
  const [activeMissionId, setActiveMissionId] = useState(MISSIONS_LIST[0].id);
  const [activeMonth, setActiveMonth] = useState(MONTHS[new Date().getMonth()]);
  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const [viewMode, setViewMode] = useState('week'); 
  const [searchTerm, setSearchTerm] = useState("");
  const [agentSearch, setAgentSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef(null);

  // Ton filtrage original
  const weeksAvailable = STATIC_SCHEDULE_STORE.filter(plan => 
    plan.missionId === activeMissionId && plan.month === activeMonth
  );
  
  const activeWeek = weeksAvailable.find(w => w.id === selectedWeekId) || weeksAvailable[0];
  const currentMission = MISSIONS_LIST.find(m => m.id === activeMissionId);
  const filteredMissions = MISSIONS_LIST.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const agentSuggestions = useMemo(() => {
    if (!agentSearch || selectedAgent) return [];
    const agents = weeksAvailable.flatMap(w => w.days.flatMap(d => d.agents.map(a => a.Nom)));
    return [...new Set(agents)].filter(n => n.toLowerCase().includes(agentSearch.toLowerCase()));
  }, [agentSearch, weeksAvailable, selectedAgent]);

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');
    html2pdf().from(element).set({
      margin: 10,
      filename: `Planning_${selectedAgent || currentMission.name}_${activeMonth}.pdf`,
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    }).save();
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.topNav} className="no-print">
        <div style={styles.brandZone}><h1>MANSA DASHBOARD</h1></div>
        <div style={styles.controlsZone}>
          <div style={styles.monthNavigation}>
            <button style={styles.navBtn} onClick={() => scrollRef.current.scrollLeft -= 150}>‹</button>
            <div style={styles.monthCarousel} ref={scrollRef}>
              {MONTHS.map(m => (
                <div key={m} style={styles.monthPill(activeMonth === m)} onClick={() => { setActiveMonth(m); setSelectedWeekId(null); }}>
                  {m}
                </div>
              ))}
            </div>
            <button style={styles.navBtn} onClick={() => scrollRef.current.scrollLeft += 150}>›</button>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <select style={styles.styledSelect} value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
               <option value="week">Vue Hebdomadaire</option>
               <option value="month">Vue Mensuelle</option>
            </select>

            {viewMode === 'week' && (
              <select style={styles.styledSelect} value={selectedWeekId || ""} onChange={(e) => setSelectedWeekId(e.target.value)}>
                 {weeksAvailable.length > 0 ? weeksAvailable.map(w => <option key={w.id} value={w.id}>{w.label}</option>) : <option>Aucun planning</option>}
              </select>
            )}
          </div>
        </div>
      </div>

      <div style={styles.mainLayout}>
        <aside style={styles.weekSidebar} className="no-print">
          <div style={styles.sidebarHeader}>
            <h3>Lieux (Missions)</h3>
            <input style={styles.searchInput} placeholder="🔍 Rechercher site..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div style={styles.weekItemsContainer}>
            {filteredMissions.map(m => (
              <div key={m.id} style={styles.weekSelector(activeMissionId === m.id)} onClick={() => setActiveMissionId(m.id)}>
                <span style={styles.weekLabel}>{m.name}</span>
                <span>›</span>
              </div>
            ))}
          </div>

          <div style={{...styles.sidebarHeader, borderTop: '1px solid #eee', position: 'relative'}}>
            <h3>Agent</h3>
            <input 
              style={styles.searchInput} 
              placeholder="🔍 Nom de l'agent..." 
              value={selectedAgent || agentSearch} 
              onChange={(e) => {setAgentSearch(e.target.value); setSelectedAgent(null);}} 
            />
            {agentSuggestions.length > 0 && (
              <div style={styles.suggestionBox}>
                {agentSuggestions.map(n => (
                  <div key={n} style={styles.suggestionItem} onClick={() => {setSelectedAgent(n); setAgentSearch(n); setViewMode('month');}}>
                    {n}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        <div style={styles.planningView}>
          {weeksAvailable.length > 0 ? (
            <div style={styles.planningPaper} onClick={() => setIsModalOpen(true)}>
              <div className="paper-overlay" style={styles.paperOverlay}><span>Aperçu & PDF</span></div>
              <div style={styles.paperHeader}>
                <h2>{selectedAgent ? `Planning : ${selectedAgent}` : currentMission.name}</h2>
                <p style={{color: '#64748b'}}>{viewMode === 'month' ? `Planning Mensuel - ${activeMonth}` : activeWeek?.label}</p>
              </div>
              <PlanningTable 
                weeks={viewMode === 'month' ? weeksAvailable : [activeWeek]} 
                isFullSize={false} 
                filterAgent={selectedAgent} 
                viewMode={viewMode}
              />
            </div>
          ) : (
            <div style={styles.emptyState}><h3>Aucun planning disponible</h3></div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div style={styles.modalBackdrop} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalNav}>
              <h2>Export : {selectedAgent ? `Mensuel ${selectedAgent}` : currentMission.name}</h2>
              <div>
                <button style={styles.downloadBtn} onClick={handleDownloadPDF}>📥 PDF</button>
                <button style={styles.closeBtn} onClick={() => setIsModalOpen(false)}>Fermer</button>
              </div>
            </div>
            <div style={styles.modalBody} id="pdf-content">
              <h1 style={{color: '#4f46e5', margin:0}}>MANSA PROTECTION</h1>
              <h2 style={{margin: '10px 0'}}>{selectedAgent ? `Agent : ${selectedAgent}` : `Site : ${currentMission.name}`}</h2>
              <PlanningTable 
                weeks={viewMode === 'month' ? weeksAvailable : [activeWeek]} 
                isFullSize={true} 
                filterAgent={selectedAgent} 
                viewMode={viewMode}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-print { display: flex; }
        .paper-overlay { opacity: 0; transition: 0.2s; position: absolute; inset: 0; background: rgba(79, 70, 229, 0.04); display: flex; align-items: center; justify-content: center; border-radius: 20px; z-index: 5; }
        .paper-overlay span { background: #4f46e5; color: white; padding: 10px 20px; border-radius: 30px; font-weight: bold; }
        div:hover > .paper-overlay { opacity: 1; }
      `}</style>
    </div>
  );
}

// --- TES STYLES ORIGINAUX CONSERVÉS ---
const styles = {
  dashboard: { height: '100vh', display: 'flex', flexDirection: 'column', background: '#f4f6f9', fontFamily: "'Segoe UI', sans-serif", overflow: 'hidden' },
  topNav: { background: 'white', borderBottom: '1px solid #e1e4e8', padding: '10px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brandZone: { fontSize: '0.8rem', color: '#4f46e5' },
  controlsZone: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' },
  monthNavigation: { display: 'flex', alignItems: 'center', gap: '5px' },
  navBtn: { background: '#f1f5f9', border: 'none', color: '#4f46e5', height: '32px', cursor: 'pointer', fontWeight: 'bold' },
  monthCarousel: { display: 'flex', gap: '6px', overflowX: 'hidden', scrollBehavior: 'smooth', maxWidth: '400px' },
  monthPill: (active) => ({ padding: '4px 12px', background: active ? '#4f46e5' : '#f1f5f9', color: active ? 'white' : 'black', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }),
  styledSelect: { width: '220px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', background: '#f8fafc', fontWeight: 600, cursor: 'pointer' },
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  weekSidebar: { width: '300px', background: 'white', borderRight: '1px solid #e1e4e8', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '15px 20px' },
  searchInput: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', boxSizing: 'border-box' },
  suggestionBox: { position: 'absolute', left: '20px', right: '20px', background: 'white', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, borderRadius: '8px' },
  suggestionItem: { padding: '10px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', fontSize: '0.85rem' },
  weekItemsContainer: { flex: 1, overflowY: 'auto', padding: '15px' },
  weekSelector: (active) => ({ display: 'flex', justifyContent: 'space-between', padding: '14px', borderRadius: '12px', cursor: 'pointer', marginBottom: '10px', background: active ? '#4f46e5' : '#fafafa', color: active ? 'white' : 'black', border: '1px solid #eee' }),
  weekLabel: { fontWeight: 700, fontSize: '0.85rem' },
  planningView: { flex: 1, padding: '30px', overflowY: 'auto', display: 'flex', justifyContent: 'center' },
  planningPaper: { background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)', cursor: 'pointer', position: 'relative', width: '100%', maxWidth: '1000px', height: 'fit-content' },
  paperHeader: { marginBottom: '20px' },
  tableWrapper: (full) => ({ overflowX: full ? 'visible' : 'auto', width: '100%' }),
  planningGrid: { width: '100%', borderCollapse: 'separate', borderSpacing: '5px' },
  th: { padding: '12px', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' },
  gridCell: { verticalAlign: 'top', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '8px', padding: '5px', minHeight: '100px', width: '14%' },
  agentTicket: (bg, border) => ({ padding: '10px', borderRadius: '6px', marginBottom: '5px', fontSize: '0.75rem', backgroundColor: bg, borderLeft: `4px solid ${border}` }),
  agentTitle: { fontWeight: 800 },
  agentSub: { fontSize: '0.65rem', opacity: 0.8 },
  agentTimer: { fontSize: '0.65rem', fontWeight: 'bold', marginTop: '5px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '5px' },
  modalBackdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { background: 'white', width: '95%', height: '90vh', borderRadius: '20px', display: 'flex', flexDirection: 'column' },
  modalNav: { padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  downloadBtn: { background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  closeBtn: { background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginLeft: '10px' },
  modalBody: { flex: 1, overflowY: 'auto', padding: '40px', textAlign: 'center' },
  emptyState: { padding: '40px', textAlign: 'center', color: '#64748b' }
};

