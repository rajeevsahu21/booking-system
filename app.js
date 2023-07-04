import express from "express";
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";

import seatRotue from "./routes/seat.js";

const app = express();

config();
dbConnect();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api/seat", seatRotue);

const port = process.env.PORT || 5000;
app.listen(5000, (req, res) => {
  console.log(`Server running on port ${port}`);
});
