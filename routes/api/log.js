const express = require("express");
const router = express.Router();

// auth middleware
const auth = require("../../middleware/auth");

const Log = require("../../models/Log");

// @route   GET api/log
// @desc    Gets all logs
// @access  Private
router.get("/", auth, (req, res) => {
  console.log(auth.arguments["0"].user);
  Log.find()
    .sort({ date: -1 })
    .then(log => res.json(log));
});

// @route   POST api/log
// @desc    Adds an activity
// @access  Private
router.post("/", auth, (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ msg: "Invalid activity" });
  }

  const newLog = new Log({
    description
  });
  newLog
    .save()
    .then(log => res.json(log))
    .catch(err => res.status(400).json({ msg: "Cannot create activity", err }));
});

module.exports = router;
