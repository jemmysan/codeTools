import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { Restaurant } from "./models/Restaurant.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connecté à MongoDB");

    // Nettoyer les anciennes données
    await User.deleteMany();
    await Restaurant.deleteMany();

    console.log("🗑 Anciennes données supprimées");

    // Création d'un utilisateur
    const user = await User.create({
      name: "Jean Dupont",
      email: "jean@example.com",
      password: "password123",
      phone: "0612345678",
      location: {
        type: "Point",
        coordinates: [2.3522, 48.8566], // Paris
        address: {
          full: "Paris, France",
          city: "Paris",
          postalCode: "75000",
          country: "France"
        },
        source: "gps"
      }
    });

    console.log("👤 Utilisateur inséré:", user.email);

    // Création de restaurants autour de Paris
    const restaurants = [
      {
        name: "Le Gourmet Parisien",
        address: "10 Rue de Rivoli, Paris",
        location: {
          type: "Point",
          coordinates: [2.357, 48.856] // proche Paris centre
        }
      },
      {
        name: "Pizza Bella",
        address: "25 Avenue des Champs-Élysées, Paris",
        location: {
          type: "Point",
          coordinates: [2.303, 48.870] // Champs Élysées
        }
      },
      {
        name: "Sushi Zen",
        address: "8 Rue de Lyon, Paris",
        location: {
          type: "Point",
          coordinates: [2.374, 48.846] // Gare de Lyon
        }
      },
      {
        name: "La Table du Chef",
        address: "5 Boulevard Saint-Germain, Paris",
        location: {
          type: "Point",
          coordinates: [2.345, 48.853] // Quartier Latin
        }
      },
      {
        name: "Boulangerie du Coin",
        address: "15 Rue de Belleville, Paris",
        location: {
          type: "Point",
          coordinates: [2.388, 48.872] // Belleville
        }
      }
    ];

    await Restaurant.insertMany(restaurants);
    console.log("🍴 Restaurants insérés:", restaurants.length);

    console.log("🎉 Données de test ajoutées avec succès !");
    process.exit();
  } catch (error) {
    console.error("❌ Erreur lors du seed:", error);
    process.exit(1);
  }
};

seedData();


/// command to launch 

// node seed.js
