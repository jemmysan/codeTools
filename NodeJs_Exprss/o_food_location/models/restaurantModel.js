import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  createdAt: { type: Date, default: Date.now },

  // Localisation
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
     source: {
      type: String,
      enum: ["gps", "manual", "geocoded"],
      default: "manual"
    }
  }
});

restaurantSchema.index({ location: "2dsphere" });

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
