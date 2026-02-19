const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const clearUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGO_URI}`);

    // Clear all users
    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users from database`);

    console.log("Database cleared successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error clearing database:", error);
    process.exit(1);
  }
};

clearUsers();
