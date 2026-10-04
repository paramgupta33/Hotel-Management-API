const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
import hotelRouter from './routes/hotel.js';
import userRouter from './routes/user.js';
import bookingRouter from './routes/booking.js';
import roomRouter from './routes/room.js';

// Middleware
app.use(express.json());

// Import routers
const hotelRouter = require("./routes/hotel");
// Mount router
app.use("/hotels", hotelRouter);


// Import routers
const userRouter = require("./routes/user");
// Mount router
app.use("/users", userRouter);


// Import routers
const bookingRouter = require("./routes/booking");
// Mount router
app.use("/bookings", bookingRouter);


// Import routers
const roomRouter = require("./routes/room");
// Mount router
app.use("/rooms", roomRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});