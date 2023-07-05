import fs from "fs";

import Seat from "../models/Seat.js";
import SeatPrice from "../models/SeatPrice.js";
import Booking from "../models/Booking.js";
import { readSeatData, readSeatPriceData } from "../utils/readCSV.js";

const addSeatData = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: true, message: "file is required" });
    const data = await readSeatData(req.file.filename);
    const seats = await Seat.insertMany(data);
    res
      .status(200)
      .json({ error: false, message: "Seat was added successfully" });
    fs.unlinkSync(req.file.path);
  } catch (err) {
    res
      .status(500)
      .json({ error: true, message: err.message || "Internal server error" });
  }
};

const addSeatPriceData = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: true, message: "file is required" });
    const data = await readSeatPriceData(req.file.filename);
    const seatPrice = await SeatPrice.insertMany(data);
    res
      .status(200)
      .json({ error: false, message: "Seat Pricing was added successfully" });
    fs.unlinkSync(req.file.path);
  } catch (err) {
    res
      .status(500)
      .json({ error: true, message: err.message || "Internal server error" });
  }
};

const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find(
      {},
      { _id: 0, __v: 0 },
      { sort: { seat_class: 1 } }
    );
    res
      .status(200)
      .json({ error: false, data: seats, message: "Seats found successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: true, message: err.message || "Internal server error" });
  }
};

const getSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findOne({ id }, { _id: 0, __v: 0 }).lean();
    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }
    const price = await getPrice(seat.seat_class);
    res.status(200).json({
      error: false,
      data: { ...seat, price },
      message: "Seat found successfully",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: true, message: err.message || "Internal server error" });
  }
};

export { addSeatData, addSeatPriceData, getAllSeats, getSeat, getPrice };

const getPrice = async (seat_class) => {
  try {
    const totalSeatOfThisClass = await Seat.countDocuments({ seat_class });
    const totalBookedSeatOfThisClass = await Seat.countDocuments({
      seat_class,
      is_booked: true,
    });
    let price;
    let percentage = (totalBookedSeatOfThisClass / totalSeatOfThisClass) * 100;
    const seatPrice = await SeatPrice.findOne({ seat_class });
    if (percentage < 40) {
      price = seatPrice.min_price
        ? seatPrice.min_price
        : seatPrice.normal_price;
    } else if (percentage > 60) {
      price = seatPrice.max_price
        ? seatPrice.max_price
        : seatPrice.normal_price;
    } else {
      price = seatPrice.normal_price
        ? seatPrice.normal_price
        : seatPrice.max_price;
    }
    return price;
  } catch (err) {
    console.error(err);
  }
};
