import React, { useState } from 'react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const styles = {
    nav: {
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      
      // Centrage absolu correct
      position: 'fixed', 
      bottom: '25px',
      left: '50%',
      transform: 'translateX(-50%)',
      
      // Largeur adaptative pour la responsivité
      width: 'auto',
      minWidth: '320px', 
      maxWidth: '90%', 
      
      height: '60px',
      padding: '0 20px',
      borderRadius: '60px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
      border: '1px solid #f0f0f0',
      zIndex: 1000,
    },
    item: (isActive) => ({
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: isActive ? '#ffffff' : '#0d1b60',
      opacity: isActive ? 1 : 0.5,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      flex: 1, // Répartition égale de l'espace
      position: 'relative',
    }),
    activeCircle: {
      position: 'absolute',
      backgroundColor: '#0d1b60',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      top: '-30px', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '6px solid #f4f6f9', 
      boxShadow: '0 8px 20px rgba(13, 27, 96, 0.3)',
      zIndex: 2,
    },
    label: (isActive) => ({
      fontSize: '0.65rem',
      fontWeight: '800',
      marginTop: isActive ? '35px' : '4px',
      textTransform: 'uppercase',
      color: '#0d1b60',
      transition: '0.3s',
      whiteSpace: 'nowrap'
    })
  };

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'missions', icon: '📊', label: 'Mission' },
    { id: 'agents', icon: '👤', label: 'Agent' },
    { id: 'timetable', icon: '📋', label: 'Timetable' }
  ];

  return (
    <nav style={styles.nav}>
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <div 
            key={item.id} 
            style={styles.item(isActive)} 
            onClick={() => setActiveTab(item.id)}
          >
            {isActive ? (
              <div style={styles.activeCircle}>
                <span style={{ fontSize: '1.5rem', color: 'white' }}>{item.icon}</span>
              </div>
            ) : (
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
            )}
            
            <span className="nav-label" style={styles.label(isActive)}>
              {item.label}
            </span>
          </div>
        );
      })}

      <style>{`
        /* Sur PC, on peut fixer une largeur précise si désiré */
        @media (min-width: 1000px) {
          nav { width: 50% !important; }
        }

        /* Sur Mobile, on gère l'espace pour éviter les débordements */
        @media (max-width: 600px) {
          .nav-label { display: none !important; }
          nav { 
            width: 90% !important; 
            min-width: auto !important;
            padding: 0 10px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;