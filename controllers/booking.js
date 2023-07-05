import Booking from "../models/Booking.js";
import Seat from "../models/Seat.js";
import sendEmail from "../utils/sendEmail.js";
import { getPrice } from "./seat.js";

const createBooking = async (req, res) => {
  try {
    const { seatIds, name, email, phone } = req.body;
    const booking = await Booking.find({ seatIds: { $in: seatIds } });
    if (booking.length)
      return res
        .status(400)
        .json({ error: "One or more seats are already booked" });
    const seats = await Seat.find({ id: { $in: seatIds } });
    let amount = 0;
    for (let i = 0; i < seats.length; i++) {
      let price = await getPrice(seats[i].seat_class);
      amount += price;
    }
    amount = amount.toFixed(2);
    const newBooking = await Booking.create({
      name,
      email,
      amount,
      phone,
      seatIds,
    });
    const mailOptions = {
      from: `"no-reply" ${process.env.SMTP_USER_NAME}`,
      to: email,
      subject: "Booking Confirmation",
      text: `This is a confirmation for your booking of amount $${amount}`,
    };
    sendEmail(mailOptions);
    await Seat.updateMany({ id: { $in: seatIds } }, { is_booked: true });
    res.status(200).json({
      error: false,
      amount: newBooking.amount,
      bookingId: newBooking._id,
      message: "Booking is done",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: true, message: err.message || "Internal server error" });
  }
};

const getBookings = async (req, res) => {
  try {
    const { userIdentifier } = req.query;
    if (!userIdentifier)
      return res
        .status(400)
        .json({ error: true, message: "User identifier is required" });
    const bookings = await Booking.find(
      {
        $or: [{ email: userIdentifier }, { phone: userIdentifier }],
      },
      { __v: 0 }
    );
    if (!bookings.length)
      return res
        .status(404)
        .json({ error: false, message: "Bookings not found" });
    res.status(200).json({
      error: false,
      data: bookings,
      message: "Bookings found successfully",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: true, message: err.message || "Internal server error" });
  }
};

export { createBooking, getBookings };
