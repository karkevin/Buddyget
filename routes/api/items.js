const express = require("express");
const router = express.Router();

// auth middleware
const auth = require("../../middleware/auth");

// Models
const Item = require("../../models/Item");
const Transaction = require("../../models/Transaction");
const Group = require("../../models/Group");

// @route   GET api/items
// @desc    Get All Items
// @access  Private
router.get("/", auth, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .populate("buyer buyerGroup", "-password")
    .then(items => res.json(items))
    .catch(err => res.status(400).json({ msg: "Couldn't get items." }));
});

// @route   GET api/items/:id
// @desc    Get item by id
// @acess   Private
router.get("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .sort({ date: -1 })
    .populate("buyer buyerGroup", "-password")
    .then(items => {
      res.json(items);
    })
    .catch(err =>
      res.status(400).json({
        msg: `Couldn't get user's items with id ${req.params.id}`,
        err
      })
    );
});

// @route   GET api/items/group/:groupId
// @desc    Get item by group id
// @acess   Private

router.get("/group/:groupId", auth, (req, res) => {
  const { groupId } = req.params;

  Item.find({ groupId })
    .sort({ date: -1 })
    .populate("buyer buyerGroup", "-password")
    .then(items => {
      res.json(items);
    })
    .catch(err =>
      res
        .status(400)
        .json({ msg: `Couldn't get item with group ${req.params.user}`, err })
    );
});

// @route   GET api/items/user/:userId
// @desc    Get item by user id
// @acess   Private

router.get("/user/:userId", auth, (req, res) => {
  const { userId } = req.params;

  Item.find({ buyer: userId })
    .sort({ date: -1 })
    .populate("buyer buyerGroup", "-password")
    .then(items => {
      res.json(items);
    })
    .catch(err =>
      res
        .status(400)
        .json({ msg: `Couldn't get item with user ${req.params.user}`, err })
    );
});

// @route   POST api/items
// @desc    Create an item
// @access  Private
router.post("/", auth, (req, res) => {
  const { buyer, location, price, buyerGroup, date, groupId } = req.body;
  if (!location || !price || !buyerGroup) {
    return res.status(400).json({ msg: "Please fill out all fields." });
  } else if (buyerGroup.length < 1) {
    return res.status(400).json({ msg: "Buyer group cannot be empty." });
  } else if (!buyer) {
    return res.status(400).json({ msg: "User not in group." });
  } else if (!groupId) {
    return res.status(400).json({ msg: "Could not assign group id." });
  }
  if (price <= 0) {
    return res.status(400).json({ msg: "Price msut be positive." });
  }

  newItem = new Item({
    buyer,
    location,
    price,
    buyerGroup,
    groupId,
    date: date ? date : Date.now()
  });

  newItem
    .save()
    .then(item => {
      updateTotalExpenses(newItem.buyer, newItem.price);
      const splitPrice = (newItem.price / newItem.buyerGroup.length).toFixed(2);
      updateTransaction(newItem.buyer, newItem.buyerGroup, splitPrice);
      Item.findById(item._id)
        .populate("buyer buyerGroup", "-password")
        .then(item => res.json(item));
    })
    .catch(err => res.status(400).json({ msg: "Cannot create item" }));
});

// @route   PUT api/items/:id
// @desc    update an item
// @access  Private
router.put("/:id", auth, (req, res) => {
  const { buyer, buyerGroup, price, location } = req.body;

  if (price <= 0) {
    return res.status(400).json({ msg: "Price msut be positive." });
  }
  if (!location || !price || !buyerGroup) {
    return res.status(400).json({ msg: "Please fill out all fields." });
  } else if (buyerGroup.length < 1) {
    return res.status(400).json({ msg: "Buyer group cannot be empty." });
  } else if (!buyer) {
    return res.status(400).json({ msg: "User not in group." });
  }

  Item.findByIdAndUpdate(req.params.id, req.body)
    .then(oldItem => {
      // NOTE this can be later optimized.
      updateTotalExpenses(oldItem.buyer, price - oldItem.price);

      // delete old item from transactions
      let splitPrice = (-oldItem.price / oldItem.buyerGroup.length).toFixed(2);
      updateTransaction(oldItem.buyer, oldItem.buyerGroup, splitPrice);

      // add new item data to transactions
      splitPrice = (price / buyerGroup.length).toFixed(2);
      updateTransaction(buyer, buyerGroup, splitPrice);

      // Returns the item with all fields populated.
      Item.findById(oldItem._id)
        .populate("buyer buyerGroup", "-password")
        .then(item => res.json(item));
    })
    .catch(err =>
      res.status(400).json({ msg: "Item could not be updated", err })
    );
});

// @route   DELETE api/items/:id
// @desc    delete an item by id
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .populate("buyer buyerGroup", "-password")
    .then(item => {
      updateTotalExpenses(item.buyer, -item.price);
      const splitPrice = (-item.price / item.buyerGroup.length).toFixed(2);

      // Since the item is populated, need to access its fields to pass in the correct arguments for updateTransaction
      const itemBuyerGroup = item.buyerGroup.map(user => user._id);
      updateTransaction(item.buyer._id, itemBuyerGroup, splitPrice);
      item.remove().then(delItem => res.json(delItem));
    })
    .catch(err =>
      res.status(400).json({ msg: "Item could not be deleted", err })
    );
});

/* Private function to update transactions based on the new price, and updated group.
 * Takes in the buyerID, the buyer group, and the split price between the members of the group.
 */
function updateTransaction(buyerId, buyerGroup, splitPrice) {
  // buyerGroup is a list of
  Transaction.find({
    $or: [
      {
        $and: [{ source: { $in: buyerGroup } }, { destination: buyerId }]
      },
      {
        $and: [{ destination: { $in: buyerGroup } }, { source: buyerId }]
      }
    ]
  }).then(transactions => {
    transactions.forEach(function(transaction) {
      let updatePrice = splitPrice;

      // toggle the split price depending on the source of the transaction.
      transaction.source.equals(buyerId) ? (updatePrice = -updatePrice) : null;

      transaction
        .updateOne({
          $inc: { money: updatePrice }
        })
        .then(() => null)
        .catch(err => res.status(400).json("Couldn't update transaction."));
    });
  });
}

function updateTotalExpenses(buyerId, price) {
  Group.findOne({ users: { $elemMatch: { $in: buyerId } } })
    .then(group => group.updateOne({ $inc: { totalExpenses: price } }))
    .catch(err => console.log(err));
}

module.exports = router;
