import express from "express";
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";

import seatRotue from "./routes/seat.js";
import bookingRoute from "./routes/booking.js";

const app = express();

config();
dbConnect();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use(express.json());
app.use("/api/seat", seatRotue);
app.use("/api/booking", bookingRoute);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});
