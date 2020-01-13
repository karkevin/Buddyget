const express = require("express");
const router = express.Router();

// auth middleware
const auth = require("../../middleware/auth");

const Log = require("../../models/Log");

// @route   GET api/log/group/:id
// @desc    Gets groups logs
// @access  Private
router.get("/group/:groupId", auth, (req, res) => {
  const { groupId } = req.params;
  Log.find({ groupId })
    .sort({ date: -1 })
    .then(log => res.json(log));
});

// @route   POST api/log
// @desc    Adds an activity
// @access  Private
router.post("/", auth, (req, res) => {
  const { description, groupId } = req.body;
  if (!description || !groupId) {
    return res.status(400).json({ msg: "Invalid activity" });
  }

  const newLog = new Log({
    description,
    groupId
  });
  newLog
    .save()
    .then(log => res.json(log))
    .catch(err => res.status(400).json({ msg: "Cannot create activity", err }));
});

module.exports = router;
