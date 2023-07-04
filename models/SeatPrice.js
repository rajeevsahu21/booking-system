import mongoose from "mongoose";

const seatPriceSchema = new mongoose.Schema({
  id: Number,
  seat_class: String,
  min_price: Number,
  normal_price: Number,
  max_price: Number,
});

export default mongoose.model("SeatPrice", seatPriceSchema);
