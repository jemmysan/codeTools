const place = autocomplete.getPlace();

const payload = {
  userId: "<USER_ID>",
  location: {
    type: "Point",
    coordinates: [
      place.geometry.location.lng(),
      place.geometry.location.lat()
    ],
    address: {
      full: place.formatted_address,
      city: place.address_components.find(c => c.types.includes("locality"))?.long_name,
      postalCode: place.address_components.find(c => c.types.includes("postal_code"))?.long_name,
      country: place.address_components.find(c => c.types.includes("country"))?.long_name
    },
    source: "geocoded"
  }
};

fetch("http://localhost:5000/api/user/update-location", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
