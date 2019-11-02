const express = require("express");
const router = express.Router();

// Item model
const Item = require("../../models/Item");

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
// @desc    create an item
// @access  Public
router.post("/", (req, res) => {
  newItem = new Item({
    name: req.body.name,
    location: req.body.location,
    price: req.body.price,
    group: req.body.group,
    date: req.body.date ? req.body.date : Date.now()
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ msg: "Cannot create item", err }));
});

// @route   PUT api/items/:id
// @desc    update an item
// @access  Public
router.put("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item
        .updateOne(req.body, { upsert: true })
        .then(update => res.json({ success: true }))
    )
    .catch(err =>
      res.status(400).json({ msg: "Item could not be updated", err })
    );
});

// @route   DELETE api/items/:id
// @desc    delete an item by id
// @access  Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(delItem => res.json({ success: true, delItem }))
    )
    .catch(err =>
      res.status(400).json({ msg: "Item could not be deleted", err })
    );
});

module.exports = router;
