import express from "express";
import { createRestaurant, getRestaurants } from "../controllers/restaurantController.js";
import { createRestaurantSchema } from "../validators/restaurantValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", validate(createRestaurantSchema), createRestaurant);
router.get("/", getRestaurants);

export default router;
