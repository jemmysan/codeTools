import express from "express";
import { updateUserLocation, getNearbyRestaurants } from "../controllers/locationController.js";
import { updateLocationSchema } from "../validators/userValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/user/update-location", validate(updateLocationSchema), updateUserLocation);
router.get("/restaurants/nearby", getNearbyRestaurants);

export default router;
