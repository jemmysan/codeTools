import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { User } from "./models/User.js";
import { Restaurant } from "./models/Restaurant.js";

dotenv.config();

const NB_USERS = 5;       // 🔹 Nombre d'utilisateurs à générer
const NB_RESTAURANTS = 15; // 🔹 Nombre de restaurants à générer

// Fonction utilitaire pour générer une coordonnée aléatoire proche de Paris
function randomCoordinatesParis(radiusInKm = 10) {
  const earthRadius = 6371; // Rayon Terre en km
  const lat = 48.8566; // Paris latitude
  const lng = 2.3522;  // Paris longitude

  // Générer un offset aléatoire
  const dx = (Math.random() - 0.5) * 2 * radiusInKm;
  const dy = (Math.random() - 0.5) * 2 * radiusInKm;

  const newLat = lat + (dy / earthRadius) * (180 / Math.PI);
  const newLng = lng + (dx / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI/180);

  return [parseFloat(newLng.toFixed(6)), parseFloat(newLat.toFixed(6))];
}

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connecté à MongoDB");

    // Nettoyer la base
    await User.deleteMany();
    await Restaurant.deleteMany();
    console.log("🗑 Anciennes données supprimées");

    // Générer utilisateurs
    const users = [];
    for (let i = 0; i < NB_USERS; i++) {
      const [lng, lat] = randomCoordinatesParis();

      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        phone: faker.phone.number(),
        location: {
          type: "Point",
          coordinates: [lng, lat],
          address: {
            full: faker.location.streetAddress({ useFullAddress: true }),
            city: "Paris",
            postalCode: faker.location.zipCode(),
            country: "France"
          },
          source: "gps"
        }
      });
    }

    const createdUsers = await User.insertMany(users);
    console.log(`👤 ${createdUsers.length} utilisateurs créés`);

    // Générer restaurants
    const restaurants = [];
    for (let i = 0; i < NB_RESTAURANTS; i++) {
      const [lng, lat] = randomCoordinatesParis();

      restaurants.push({
        name: faker.company.name(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        location: {
          type: "Point",
          coordinates: [lng, lat]
        }
      });
    }

    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`🍴 ${createdRestaurants.length} restaurants créés`);

    console.log("🎉 Données de test ajoutées avec succès !");
    process.exit();
  } catch (error) {
    console.error("❌ Erreur lors du seed:", error);
    process.exit(1);
  }
};

seedData();


/// command to launch 
// npm install @faker-js/faker

// node seed.js

// Verify le nombre d'utilisateur creéer
// db.users.find().pretty()
