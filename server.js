const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    application: "Node.js GKE CI/CD Demo",
    version: process.env.APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    message: "Node.js application v2 running successfully",
    hostname: require("os").hostname(),
    version: process.env.APP_VERSION || "1.0.0"
  });
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});