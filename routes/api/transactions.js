const express = require("express");
const router = express.Router();

const Transaction = require("../../models/Transaction");
const auth = require("../../middleware/auth");

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get("/", auth, (req, res) => {
  Transaction.find()
    .sort({ date: -1 })
    .populate("source destination", "-password")
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json({ msg: "Couldn't get transactions." }));
});

// @route   GET /api/transactions/:userId
// @desc    Get all transactions with userId
// @access  Private
router.get("/:userId", auth, (req, res) => {
  Transaction.find({
    $or: [{ source: req.params.userId }, { destination: req.params.userId }]
  })
    .sort({ date: -1 })
    .populate("source destination", "-password")
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json({ msg: "Couldn't get transactions." }));
});

module.exports = router;
