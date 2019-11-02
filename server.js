const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// used to parse incoming requests with JSON payload.
app.use(express.json());

// When user hits the endpoint `/api/items` should refer to the code in items.
app.use("/api/items", require("./routes/api/items"));

const db = require("./config/keys").mongoURI;
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected.."))
  .catch(err => console.log(err));

// app.get('/', (req, res) => res.send('H'))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
