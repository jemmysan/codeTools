import React, { useState } from 'react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Par défaut réduit comme sur ton image
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState(null);

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { 
      id: 'missions', icon: '📊', label: 'Mission',
      subItems: [{ id: 'list', label: 'Liste des sites' }, { id: 'add', label: 'Nouveau site' }]
    },
    { id: 'agents', icon: '👤', label: 'Agent' },
    { id: 'timetable', icon: '📋', label: 'Planning' },
  ];

  const bottomItems = [
    { id: 'settings', icon: '⚙️', label: 'Settings' },
    { id: 'logout', icon: '🚪', label: 'Quitter', isLogout: true },
  ];

  return (
    <nav style={styles.sidebar(isCollapsed)}>
      {/* BOUTON HAMBURGER (Pour basculer) */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        style={styles.toggleBtn}
      >
        ☰
      </button>

      {/* BARRE DE RECHERCHE (Uniquement si ouvert) */}
      {!isCollapsed && (
        <div style={styles.searchContainer}>
          <input style={styles.searchInput} placeholder="Search..." />
        </div>
      )}

      {/* MENU PRINCIPAL */}
      <div style={styles.menuSection}>
        {menuItems.map((item) => (
          <div key={item.id} style={styles.itemWrapper}>
            <div 
              style={styles.menuItem(activeTab === item.id)}
              onClick={() => { setActiveTab(item.id); if(!item.subItems) setActiveSubTab(null); }}
            >
              <span style={styles.icon}>{item.icon}</span>
              {!isCollapsed && <span style={styles.label}>{item.label}</span>}
            </div>

            {/* SOUS-MENU (Flottant si réduit, en liste si ouvert) */}
            {activeTab === item.id && item.subItems && (
              <div style={isCollapsed ? styles.subMenuFloating : styles.subMenuInline}>
                {item.subItems.map(sub => (
                  <div 
                    key={sub.id} 
                    style={styles.subItem(activeSubTab === sub.id)}
                    onClick={() => setActiveSubTab(sub.id)}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER AVEC PROFIL ET LOGOUT */}
      <div style={styles.footerSection}>
        <div style={styles.separator} />
        {bottomItems.map(item => (
          <div 
            key={item.id} 
            style={styles.menuItem(activeTab === item.id)}
            onClick={() => setActiveTab(item.id)}
          >
            <span style={{...styles.icon, color: item.isLogout ? '#ef4444' : 'inherit'}}>{item.icon}</span>
            {!isCollapsed && <span style={styles.label}>{item.label}</span>}
          </div>
        ))}
        
        {/* AVATAR STYLE IMAGE */}
        <div style={styles.profileBox(isCollapsed)}>
          <div style={styles.avatar}>👤</div>
          {!isCollapsed && (
            <div style={styles.profileText}>
              <div style={{fontWeight: 'bold', fontSize: '0.8rem'}}>Nida Sheikh</div>
              <div style={{fontSize: '0.6rem', opacity: 0.7}}>Web Developer</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  sidebar: (isCollapsed) => ({
    backgroundColor: '#000000', // Noir profond comme l'image
    color: '#ffffff',
    width: isCollapsed ? '70px' : '240px',
    height: '95vh',
    position: 'fixed',
    left: '20px', top: '2.5vh',
    borderRadius: '30px',
    display: 'flex', flexDirection: 'column',
    padding: '20px 10px',
    transition: 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    zIndex: 1000,
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  }),
  toggleBtn: {
    background: 'none', border: 'none', color: 'white', cursor: 'pointer',
    fontSize: '20px', alignSelf: 'center', marginBottom: '30px'
  },
  searchContainer: {
    padding: '0 10px', marginBottom: '20px'
  },
  searchInput: {
    width: '100%', padding: '10px', borderRadius: '15px',
    border: 'none', backgroundColor: '#1a1a1a', color: 'white', fontSize: '0.8rem'
  },
  menuSection: { flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' },
  itemWrapper: { width: '100%' },
  menuItem: (isActive) => ({
    display: 'flex', alignItems: 'center', padding: '12px 15px',
    borderRadius: '15px', cursor: 'pointer', transition: '0.3s',
    backgroundColor: isActive ? '#0d1b60' : 'transparent', // Bleu pour l'actif
    gap: '15px', justifyContent: 'flex-start'
  }),
  icon: { fontSize: '1.2rem', minWidth: '25px', textAlign: 'center' },
  label: { fontSize: '0.9rem', fontWeight: '500' },
  
  // --- LOGIQUE SOUS-MENUS ---
  subMenuFloating: {
    position: 'absolute', left: '80px', top: '0',
    backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '15px',
    minWidth: '150px', boxShadow: '10px 10px 30px rgba(0,0,0,0.5)',
  },
  subMenuInline: {
    paddingLeft: '45px', marginTop: '5px', display: 'flex', flexDirection: 'column', gap: '5px'
  },
  subItem: (isActive) => ({
    fontSize: '0.8rem', padding: '8px 12px', borderRadius: '10px',
    cursor: 'pointer', color: isActive ? '#ffffff' : '#94a3b8',
    backgroundColor: isActive ? '#0d1b60' : 'transparent',
  }),

  footerSection: { display: 'flex', flexDirection: 'column', gap: '10px' },
  separator: { height: '1px', backgroundColor: '#333', margin: '10px' },
  profileBox: (isCollapsed) => ({
    display: 'flex', alignItems: 'center', gap: '10px',
    backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '15px',
    marginTop: '10px', justifyContent: isCollapsed ? 'center' : 'flex-start'
  }),
  avatar: { width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default Sidebar;