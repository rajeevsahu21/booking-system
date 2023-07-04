import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  id: Number,
  seat_identifier: String,
  seat_class: String,
  is_booked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Seat", seatSchema);
