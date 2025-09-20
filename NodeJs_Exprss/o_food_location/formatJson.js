{
  "userId": "64e7a9b12345abcd67890efg",
  "location": {
    "type": "Point",
    "coordinates": [2.3522, 48.8566],
    "address": {
      "full": "12 Rue de la Paix, 75002 Paris, France",
      "city": "Paris",
      "postalCode": "75002",
      "country": "France"
    },
    "source": "geocoded"
  }
}



  rating: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }

  toJSON: { virtuals: true },
  toObject: { virtuals: true }