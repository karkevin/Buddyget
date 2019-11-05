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
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json({ msg: "Couldn't get transactions." }));
});

module.exports = router;
