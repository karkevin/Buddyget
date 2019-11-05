const express = require("express");
const router = express.Router();

const Group = require("../../models/Group");

// @route   GET api/group
// @desc    Gets a group
// @access  Public
router.get("/", (req, res) => {
  Group.find()
    .sort({ date: -1 })
    .then(groups => res.json(groups));
});

// @route   POST api/groups
// @desc    Create a group
// @access  Public
router.post("/", (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ msg: "Please enter group name." });
  }

  // check for user
  Group.findOne({ name }).then(group => {
    if (group) return res.status(400).json({ msg: "Group already exists" });

    const newGroup = new Group({
      name: req.body.name
    });

    newGroup
      .save()
      .then(group => {
        res.json(group);
      })
      .catch(err => res.status(400).json({ msg: "Cannot create group", err }));
  });
});

module.exports = router;
