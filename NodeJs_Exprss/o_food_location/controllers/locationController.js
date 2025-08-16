import { User } from "../models/User.js";
import { Restaurant } from "../models/Restaurant.js";

// Mise à jour de la localisation de l'utilisateur
export const updateUserLocation = async (req, res) => {
  try {
    const { userId, latitude, longitude, address } = req.body;

    let updateData = {};

    if (latitude && longitude) {
      updateData = {
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
          source: "gps"
        }
      };
    } else if (address) {
      // TODO: Appeler une API de géocodage si tu veux récupérer de vraies coordonnées
      const fakeCoordinates = [2.3522, 48.8566]; // Paris centre

      updateData = {
        location: {
          type: "Point",
          coordinates: fakeCoordinates,
          address: {
            full: address,
            city: "Paris",
            postalCode: "75002",
            country: "France"
          },
          source: "manual"
        }
      };
    } else {
      return res.status(400).json({ success: false, message: "Aucune donnée de localisation fournie." });
    }

    await User.findByIdAndUpdate(userId, updateData, { new: true });

    return res.status(200).json({ success: true, message: "Localisation mise à jour." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};



export const updateUserLocationStandard = async (req, res) => {
  try {
    const { userId, location } = req.body;

    if (!location || !location.coordinates) {
      return res.status(400).json({ success: false, message: "Localisation invalide" });
    }
    
    const user = await User.findByIdAndUpdate(userId, { location }, { new: true });

    res.status(200).json({
      success: true,
      message: "Localisation mise à jour",
      location: user.location
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};


// Récupération des restaurants proches
export const getNearbyRestaurants = async (req, res) => {
  try {
    const { userId, distance } = req.query;
    const maxDistance = distance ? parseInt(distance) : 5000; // par défaut 5km

    const user = await User.findById(userId);
    if (!user || !user.location.coordinates) {
      return res.status(404).json({ success: false, message: "Utilisateur introuvable ou sans localisation." });
    }

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: user.location.coordinates
          },
          $maxDistance: maxDistance
        }
      }
    });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};
