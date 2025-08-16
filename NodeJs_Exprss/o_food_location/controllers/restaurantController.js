import { Restaurant } from "../models/Restaurant.js";

// Créer un restaurant
export const createRestaurant = async (req, res) => {
  try {
    const { name, address, location } = req.body;

    const restaurant = await Restaurant.create({
      name,
      address,
      location
    });

    res.status(201).json({
      success: true,
      message: "Restaurant créé avec succès",
      restaurant
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Récupérer tous les restaurants (optionnel, pratique pour debug)
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
