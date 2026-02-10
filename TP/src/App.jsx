import Owl from './components/Owl';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>Ma collection de hiboux</h1>
      
      <div className="owl-container">
        
        <Owl 
          imageUrl="https://static.techno-science.net/illustration/Definitions/1200px/u/uhu-3_9b1eb3b2c25fd844ee8d4d913bfd30c9.jpg" 
          description="Un Grand-duc d'Amérique très sérieux."
        />

        
        <Owl 
          imageUrl="https://staging.ekolien.fr/medias/2023/04/chouette-effraie-nuit-arbre.jpg" 
          description="Une chouette effraie dans la nuit."
        />

        <Owl description="Ceci ne s'affichera pas car l'image manque." />
      </div>
    </div>
  );
}

export default App;