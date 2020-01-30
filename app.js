const express = require("express");
const path = require("path");

const app = express();

// used to parse incoming requests with JSON payload.
app.use(express.json());

// When user hits the endpoint should refer to the code to that endpoint.
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/groups", require("./routes/api/groups"));
app.use("/api/transactions", require("./routes/api/transactions"));

// Serve static assests (build folder) if we're in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // get anything else besides /api/items
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}\n`));
