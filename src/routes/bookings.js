const express = require('express');
const router = express.Router();


const {rooms} = require("./rooms");

const bookings = []
//get all bookings
router.get("/", (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(404).json({ message: "No bookings found for this user" });
    }

    const userBookings = bookings.filter(b => b.userId === parseInt(userId));
    return res.status(200).json(userBookings);
});


// GET total payment for a user
router.get("/payment-total", (req, res) => {
    const { userId } = req.query;

    const userBookings = bookings.filter(
        b => b.userId === parseInt(userId)
    );

    if (userBookings.length === 0) {
        return res.status(404).json({
            message: "No bookings found for this user"
        });
    }

    let total = 0;

    userBookings.forEach(booking => {
        const room = rooms.find(r => r.id === booking.roomId);

        if (room) {
            total += room.pricePerNight;
        }
    });

    res.status(200).json({
        userId: parseInt(userId),
        totalAmount: total,
        currency: "INR"
    });
});

// GET for a specific booking
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const result = bookings.find(b => b.id === parseInt(id));

    if (!result) {
        return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(result);
});

//posting a new booking
router.post("/", (req, res) => {
    const { userId, roomId } = req.body;
    const newBooking = {
        id: bookings.length + 1,
        userId,
        roomId,
    };

    bookings.push(newBooking);
    res.status(201).json(newBooking);

});

// PATCH cancel a booking
router.patch("/:id/cancel", (req, res) => {
    const { id } = req.params;
    const result = bookings.find(b => b.id === parseInt(id));

    if (!result) {
        return res.status(404).json({ message: "Booking not found" });
    }

    result.status = "cancelled";

    res.status(200).json(result);
});

module.exports = router;