import React, { useState, useMemo } from 'react';
import SiteFormPopUp from './SiteFormPopUp';
import ConfirmDeletePopUp from './ConfirmDeletePopUp';



export default function SitesPage() {
  // Simulation de 700 sites pour le test
  const [sites, setSites] = useState(
    Array.from({ length: 700 }, (_, i) => ({
      id: i,
      name: `Site ${i + 1}`,
      location: `Adresse ${i + 1}, Ville`,
      color: i % 2 === 0 ? "#4f46e5" : "#10b981"
    }))
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(30); // On affiche 30 au début
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  // --- FILTRAGE AUTOMATIQUE ---
  const filteredSites = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return sites.filter(s => s.name.toLowerCase().includes(lower) || s.location.toLowerCase().includes(lower));
  }, [searchTerm, sites]);

  // --- GESTION DU SCROLL ---
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setVisibleCount(prev => prev + 30); // On charge 30 de plus quand on arrive en bas
    }
  };

  // --- ACTIONS CRUD ---
  const handleSave = (data) => {
    if (selectedSite) {
      setSites(sites.map(s => s.id === selectedSite.id ? { ...data, id: s.id } : s));
    } else {
      setSites([{ ...data, id: Date.now() }, ...sites]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    setSites(sites.filter(s => s.id !== selectedSite.id));
    setIsConfirmOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header & Recherche */}
        <div style={styles.header}>
          <div style={styles.searchBox}>
            <span style={{ marginRight: '10px' }}>🔍</span>
            <input 
              style={styles.inputSearch} 
              placeholder={`Rechercher parmi ${sites.length} sites...`}
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(30); }}
            />
          </div>
          <button onClick={() => { setSelectedSite(null); setIsFormOpen(true); }} style={styles.addBtn}>
            + Ajouter
          </button>
        </div>

        {/* Liste avec Scroll Progressif */}
        <div style={styles.scrollList} onScroll={handleScroll}>
          {filteredSites.slice(0, visibleCount).map(site => (
            <div key={site.id} style={styles.item}>
              <div style={styles.siteInfo}>
                <div style={{ ...styles.colorIndicator, backgroundColor: site.color }} />
                <div>
                  <div style={styles.name}>{site.name}</div>
                  <div style={styles.location}>{site.location}</div>
                </div>
              </div>
              <div style={styles.actions}>
                <button onClick={() => { setSelectedSite(site); setIsFormOpen(true); }} style={styles.editBtn}>✏️</button>
                <button onClick={() => { setSelectedSite(site); setIsConfirmOpen(true); }} style={styles.delBtn}>🗑️</button>
              </div>
            </div>
          ))}
          {visibleCount < filteredSites.length && <div style={styles.loading}>Chargement...</div>}
        </div>
      </div>

      <SiteFormPopUp 
        key={selectedSite?.id || 'new'} 
        isOpen={isFormOpen} 
        site={selectedSite} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSave} 
      />

      <ConfirmDeletePopUp 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        onConfirm={handleDelete} 
        siteName={selectedSite?.name}
      />
    </div>
  );
}


const styles = {
  container: { padding: '20px', backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', justifyContent: 'center' },
  card: { backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '600px', padding: '24px', display: 'flex', flexDirection: 'column', height: '85vh' },
  header: { display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' },
  searchBox: { flex: 1, backgroundColor: '#f8fafc', padding: '10px 15px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex' },
  inputSearch: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '15px' },
  addBtn: { backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
  
  // Zone de scroll pour 700 éléments
  scrollList: { flex: 1, overflowY: 'auto', paddingRight: '5px' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderRadius: '16px', border: '1px solid #f1f5f9', marginBottom: '10px' },
  siteInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
  colorIndicator: { width: '5px', height: '35px', borderRadius: '10px' },
  name: { fontWeight: '700', color: '#1e293b' },
  location: { fontSize: '12px', color: '#94a3b8' },
  actions: { display: 'flex', gap: '8px' },
  editBtn: { background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' },
  delBtn: { background: '#fff1f2', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' },
  loading: { textAlign: 'center', padding: '10px', fontSize: '12px', color: '#94a3b8' }
};