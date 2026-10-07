const express = require("express");
const router = express.Router();

const rooms = [
    {
        id: 1,
        hotelId: 1,
        roomNumber: "101",
        roomType: "Deluxe",
        pricePerNight: 5500,
        status: "available"
    },
    {
        id: 2,
        hotelId: 2,
        roomNumber: "102",
        roomType: "Standard",
        pricePerNight: 4000,
        status: "available"
    },
    {
        id: 3,
        hotelId: 3,
        roomNumber: "201",
        roomType: "Suite",
        pricePerNight: 8500,
        status: "available"
    },
    {
        id: 4,
        hotelId: 1,
        roomNumber: "202",
        roomType: "Deluxe",
        pricePerNight: 6000,
        status: "maintenance"
    },
]

// GET all rooms
router.get("/", (req, res) => {
    res.status(200).json(rooms);
});

// GET a specific room by ID
router.get("/:id", (req, res) => {
    const roomId = req.params.id;

    const room = rooms.find(r => r.id === parseInt(roomId));

    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
});

// POST create a room
router.post("/", (req, res) => {
    const { hotelId, roomType, pricePerNight, status } = req.body;

    const newRoom = {
        id: rooms.length + 1,
        hotelId,
        roomType,
        pricePerNight,
        status: status || "available"
    };

    rooms.push(newRoom);

    res.status(201).json(newRoom);
});

// PATCH update a room
router.patch("/:id", (req, res) => {
    const roomId = req.params.id;

    const room = rooms.find(r => r.id === parseInt(roomId));

    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }

    const { hotelId, roomType, pricePerNight, status } = req.body;

    room.hotelId = hotelId ?? room.hotelId;
    room.roomType = roomType ?? room.roomType;
    room.pricePerNight = pricePerNight ?? room.pricePerNight;
    room.status = status ?? room.status;

    res.status(200).json(room);
});

// DELETE a room
router.delete("/:id", (req, res) => {
    const roomId = req.params.id;

    const roomIndex = rooms.findIndex(r => r.id === parseInt(roomId));

    if (roomIndex === -1) {
        return res.status(404).json({ message: "Room not found" });
    }

    rooms.splice(roomIndex, 1);

    res.status(200).json({ message: "Room deleted successfully" });
});

module.exports = { router, rooms };