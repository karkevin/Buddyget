const express = require("express");
const router = express.Router();

const Transaction = require("../../models/Transaction");
const auth = require("../../middleware/auth");

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get("/", (req, res) => {
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

// @route   PUT /api/transactions/
// @desc    Updates a transaction between 2 users.
// @access  Private
router.put("/", auth, (req, res) => {
  const { money, source, destination } = req.body;
  if (money === null || !source || !destination) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  }

  Transaction.findOneAndUpdate(
    {
      $or: [
        {
          $and: [{ source }, { destination }]
        },
        {
          $and: [{ source: destination }, { destination: source }]
        }
      ]
    },
    { money }
  )
    .then(oldTransaction =>
      Transaction.findById(oldTransaction._id).then(transaction =>
        res.json(transaction)
      )
    )
    .catch(err =>
      res.status(400).json({ msg: "Transaction could not be updated", err })
    );
});

module.exports = router;
