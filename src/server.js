const express = require('express');
require("dotenv").config();

const authMiddleware = require("./middleware/authMiddleware");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Import routers
const hotelRouter = require("./routes/hotel");
// Mount router 
app.use("/hotels", hotelRouter);


// Import routers
const authenticationRouter = require("./routes/authentication");
// Mount router
app.use("/users", authenticationRouter);


// Import routers
const bookingRouter = require("./routes/bookings");
// Mount router
app.use("/bookings", authmiddleware, bookingRouter);


// Import routers
const roomRouter = require("./routes/rooms");
// Mount router
app.use("/rooms", authmiddleware, roomRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});