const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const { protect, admin } = require("../middleware/auth");

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const {
      carId,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      customerName,
      email,
      phone,
      drivingLicenseNumber,
      licenseExpiryDate,
      aadhaarCardNumber,
      remark,
      totalPrice,
    } = req.body;

    // Validation
    if (
      !carId ||
      !startDate ||
      !endDate ||
      !pickupLocation ||
      !dropoffLocation ||
      !customerName ||
      !email ||
      !phone ||
      !drivingLicenseNumber ||
      !licenseExpiryDate ||
      !aadhaarCardNumber ||
      !totalPrice
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      carId,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      customerName,
      email,
      phone,
      drivingLicenseNumber,
      licenseExpiryDate,
      aadhaarCardNumber,
      remark,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during booking creation",
    });
  }
});

// @desc    Get all bookings for admin
// @route   GET /api/bookings
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate(
      "userId",
      "name email phone"
    );

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching bookings",
    });
  }
});

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get user bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching user bookings",
    });
  }
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating booking status",
    });
  }
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if user owns this booking or is admin
    if (
      booking.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this booking",
      });
    }

    await booking.remove();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting booking",
    });
  }
});

module.exports = router;
