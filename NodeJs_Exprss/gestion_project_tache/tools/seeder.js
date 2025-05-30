
import { Category } from '../models/category.model.js';

// Données de base
const categories = [
  { libelle: 'Informatique' },
  { libelle: 'Littérature' },
  { libelle: 'Science' },
  { libelle: 'Histoire' },
  { libelle: 'Mathématiques' },
];

const seedCategories = async () => {
  try {

    await Category.deleteMany(); // Supprime les anciennes données
    console.log('🧹 Anciennes catégories supprimées');

    await Category.insertMany(categories);
    console.log('🌱 Nouvelles catégories insérées');

    process.exit(); // Quitter le script
  } catch (error) {
    console.error('❌ Erreur lors du seeding :', error);
    process.exit(1);
  }
};

seedCategories();


//----# Ajoute un script dans ton package.json (dans la partie "scripts") 

        //----  "seed:categories": "node seed/categorySeeder.js"
        
        //----- npm run seed:categories

