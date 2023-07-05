import { Router } from "express";
import { createBooking, getBookings } from "../controllers/booking.js";

const bookingRoute = Router();

bookingRoute.post("/", createBooking);
bookingRoute.get("/", getBookings);

export default bookingRoute;
