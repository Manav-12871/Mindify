require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Chat Endpoint
app.post("/api/chat", async (req, res) => {
  const userInput = req.body.message;
  if (!userInput || typeof userInput !== "string" || !userInput.trim()) {
    return res.status(400).json({ reply: "Please enter a valid message." });
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userInput);
    const response = result.response;
    const text = response && typeof response.text === "function" ? response.text() : "Sorry, I couldn't understand that.";
    res.json({ reply: await text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    let errMsg = "Mindify couldn't respond at the moment. Please try again later.";
    if (error && error.message && error.message.includes("API key not valid")) {
      errMsg = "Server configuration error: Gemini API key is invalid or missing.";
    }
    res.status(500).json({ reply: errMsg });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Mindify Chat running at http://localhost:${PORT}`);
});