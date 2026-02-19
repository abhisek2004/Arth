const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// MongoDB Connection
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();

  const db = client.db("content_platform");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend server is running" });
});

// Get all content
app.get("/api/contents", async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const contents = await db
      .collection("contents")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    res.json(
      contents.map((content) => ({
        ...content,
        _id: content._id.toString(),
      }))
    );
  } catch (error) {
    console.error("Error fetching contents:", error);
    res.status(500).json({ error: "Failed to fetch contents" });
  }
});

// Get content by category
app.get("/api/contents/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const { db } = await connectToDatabase();
    const contents = await db
      .collection("contents")
      .find({ category })
      .sort({ created_at: -1 })
      .toArray();
    res.json(
      contents.map((content) => ({
        ...content,
        _id: content._id.toString(),
      }))
    );
  } catch (error) {
    console.error("Error fetching contents by category:", error);
    res.status(500).json({ error: "Failed to fetch contents by category" });
  }
});

// Create new content
app.post("/api/contents", async (req, res) => {
  try {
    const contentData = req.body;
    const { db } = await connectToDatabase();

    const newContent = {
      ...contentData,
      created_at: new Date(),
    };

    const result = await db.collection("contents").insertOne(newContent);

    res.status(201).json({
      ...newContent,
      _id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).json({ error: "Failed to create content" });
  }
});

// Get content by ID
app.get("/api/contents/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { db } = await connectToDatabase();
    const content = await db
      .collection("contents")
      .findOne({ _id: { $oid: id } });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.json({
      ...content,
      _id: content._id.toString(),
    });
  } catch (error) {
    console.error("Error fetching content by ID:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
