const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// used to parse incoming requests with JSON payload.
app.use(express.json());

// enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  next();
});

// var allowedOrigins = ["http://localhost:3000"];
// app.use(
//   cors({
//     origin: function(origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
//   })
// );

// When user hits the endpoint `/api/items` should refer to the code in items.
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/groups", require("./routes/api/groups"));
app.use("/api/transactions", require("./routes/api/transactions"));

const db = process.env.mongoURI;
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "buddyget"
  })
  .then(() => console.log("MongoDB connected.."))
  .catch(err => console.log(err));

app.use(express.static("client/build"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
