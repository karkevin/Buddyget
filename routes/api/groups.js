const express = require("express");
const router = express.Router();

// auth middleware
const auth = require("../../middleware/auth");

const Group = require("../../models/Group");

// @route   GET api/group
// @desc    Gets all groups
// @access  Private
router.get("/", auth, (req, res) => {
  Group.find()
    .sort({ date: -1 })
    .populate("users transactions", "-password")
    .then(groups => res.json(groups));
});

// @route   GET api/group/:name
// @desc    Gets group by name
// @acess   Private
router.get("/:name", auth, (req, res) => {
  Group.findOne({ name: req.params.name })
    .populate({
      path: "transactions",
      populate: {
        path: "source destination",
        select: "name"
      }
    })
    .populate("users", "-password")
    .then(group => {
      res.json(group);
    })
    .catch(err =>
      res.status(400).json({
        msg: `Couldn't get group with name ${req.params.name}`,
        err
      })
    );
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
