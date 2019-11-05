const express = require("express");
const router = express.Router();

// auth middleware
const auth = require("../../middleware/auth");

// Models
const Item = require("../../models/Item");
const Transaction = require("../../models/Transaction");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   GET api/items/:id
// @desc    Get item by id
// @acess   Public
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err =>
      res
        .status(400)
        .json({ msg: `Couldn't get item with id ${req.params.id}`, err })
    );
});

// @route   POST api/items
// @desc    Create an item
// @access  Private
router.post("/", auth, (req, res) => {
  const { buyer, location, price, buyerGroup, date } = req.body;

  if (!buyer || !location || !price || !buyerGroup) {
    res.status(400).json({ msg: "Please fill out all fields" });
  }

  newItem = new Item({
    buyer,
    location,
    price,
    buyerGroup,
    date: date ? date : Date.now()
  });

  newItem
    .save()
    .then(item => {
      const splitPrice = (newItem.price / newItem.buyerGroup.length).toFixed(2);
      updateTransaction(newItem, splitPrice);
      res.json(item);
    })
    .catch(err => res.status(400).json({ msg: "Cannot create item" }));
});

// @route   PUT api/items/:id
// @desc    update an item
// @access  Public
router.put("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      let newPrice = item.price;
      req.body.price ? (newPrice = req.body.price) : null;

      const splitPrice = (-item.price / item.buyerGroup.length).toFixed(2);
      updateTransaction(item, splitPrice);

      item.updateOne(req.body).then(update => {
        res.json({ success: true });
      });
    })
    .catch(err =>
      res.status(400).json({ msg: "Item could not be updated", err })
    );
});

// @route   DELETE api/items/:id
// @desc    delete an item by id
// @access  Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      const splitPrice = (-item.price / item.buyerGroup.length).toFixed(2);
      updateTransaction(item, splitPrice);
      item.remove().then(delItem => res.json({ success: true, delItem }));
    })
    .catch(err =>
      res.status(400).json({ msg: "Item could not be deleted", err })
    );
});

function updateTransaction(newItem, splitPrice) {
  Transaction.find({
    $or: [
      {
        $and: [
          { source: { $in: newItem.buyerGroup } },
          { destination: newItem.buyer }
        ]
      },
      {
        $and: [
          { destination: { $in: newItem.buyerGroup } },
          { source: newItem.buyer }
        ]
      }
    ]
  }).then(transactions => {
    transactions.forEach(function(transaction) {
      let updatePrice = splitPrice;

      transaction.source.equals(newItem.buyer)
        ? (updatePrice = -updatePrice)
        : (updatePrice = updatePrice);

      transaction
        .updateOne({
          $inc: { money: updatePrice }
        })
        .then(() => null)
        .catch(err => res.status(400).json("Couldn't update transaction."));
    });
  });
}

module.exports = router;
