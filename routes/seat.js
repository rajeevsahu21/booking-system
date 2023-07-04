import { Router } from "express";
import multer from "multer";

import {
  addSeatData,
  addSeatPriceData,
  getAllSeats,
  getSeat,
} from "../controllers/seat.js";

const upload = multer({ dest: "uploads/" });

const seatRotue = Router();

seatRotue.post("/", upload.single("seats"), addSeatData);
seatRotue.post("/price", upload.single("seatPricing"), addSeatPriceData);
seatRotue.get("/", getAllSeats);
seatRotue.get("/:id", getSeat);

export default seatRotue;
