const express = require('express');
const app = express();

const router = express.Router();

const hotels = [
  {
    id: 1,
    name: "Taj Hotel",
    location: "Mumbai",
    pricePerNight: 5000,
    ownerId: 2
  },
  {
    id: 2,
    name: "Sea View Resort",
    location: "Goa",
    pricePerNight: 3500,
    ownerId: 1
  },
  {
    id: 3,
    name: "Mountain View",
    location: "Manali",
    pricePerNight: 2500,
    ownerId: 3
  }
];

// GET all hotels
router.get("/", (req, res) => {
  res.status(200).json(hotels);
});

// GET a specific hotel by ID
router.get("/:id", (req, res) => {
    const hotelId = req.params.id;
    // Find the hotel with the given ID
    const hotel = hotels.find(h => h.id === parseInt(hotelId));

    if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
});

// POST a new hotel
router.post("/", (req, res) => {
    const { name, location, pricePerNight, ownerId } = req.body;
    const newHotel = {
        id: hotels.length + 1,
        name,
        location,
        pricePerNight,
        ownerId
    };
    hotels.push(newHotel);
    res.status(201).json(newHotel);
});

// PATCH (update) a specific hotel by ID
router.patch("/:id", (req, res) => {
    const hotelId = req.params.id;
    const hotel = hotels.find(h => h.id === parseInt(hotelId)); 

    if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
    }

    const { name, location, pricePerNight, ownerId } = req.body;
    hotel.name = name ?? hotel.name;
    hotel.location = location ?? hotel.location;
    hotel.pricePerNight = pricePerNight ?? hotel.pricePerNight;
    hotel.ownerId = ownerId ?? hotel.ownerId;

    res.status(200).json(hotel);
});

// DELETE a specific hotel by ID using the ownerId for authorization and jwt token for authentication
router.delete("/:id", (req, res) => {
    const hotelId = req.params.id;

    const hotelIndex = hotels.findIndex(
        h => h.id === parseInt(hotelId)
    );

    if (hotelIndex === -1) {
        return res.status(404).json({
            message: "Hotel not found"
        });
    }

    hotels.splice(hotelIndex, 1);

    res.status(200).json({
        message: "Hotel deleted successfully"
    });
});

module.exports = router;