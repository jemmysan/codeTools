import mongoose from "mongoose";

//end-Point

//    /user/update-location

//    /restaurants/nearby

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  accountVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },

  // Localisation standardisée
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    },
    address: {
      full: String,
      city: String,
      postalCode: String,
      country: String
    },
    source: {
      type: String,
      enum: ["gps", "manual", "geocoded"],
      default: "manual"
    }
  }
});

// Index géospatial
userSchema.index({ location: "2dsphere" });

export const User = mongoose.model("User", userSchema);
