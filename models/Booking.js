import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  amount: Number,
  seatIds: [
    {
      type: Number,
    },
  ],
});

export default mongoose.model("Booking", bookingSchema);
