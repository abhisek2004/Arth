const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@carental.com" });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Email: admin@carental.com");
      console.log("Password: admin123");
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@carental.com",
      phone: "1234567890",
      password: "admin123",
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@carental.com");
    console.log("Password: admin123");
    console.log("User ID:", adminUser._id);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
