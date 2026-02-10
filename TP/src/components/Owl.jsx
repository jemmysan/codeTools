import React from 'react';

const Owl = ({ imageUrl, description }) => {
  
  if (!imageUrl) {
    return (
      <div className="owl-card">
        <p> Aucune image de hibou n'a été trouvée.</p>
      </div>
    );
  }

  return (
    <div className="owl-card">
      <img 
        src={imageUrl} 
        alt="Un hibou" 
        className="owl-image"
      />
      <p className="owl-description">
        {description || "C'est un mystérieux hibou."}
      </p>
    </div>
  );
};

export default Owl;