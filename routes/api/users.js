const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Group = require("../../models/Group");
const Transaction = require("../../models/Transaction");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password, group, username } = req.body;

  if (!name || !email || !password || !group || !username) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  }

  // check for user
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: "User already exists" });

      const newUser = new User({
        name,
        email,
        password,
        username,
        group
      });

      // create salt for hashing of password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(user => {
              jwt.sign(
                { id: newUser.id },
                process.env.jwtSecret,
                (err, token) => {
                  if (err) throw err;

                  updateGroup(user);
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      group: user.group,
                      username: user.username
                    }
                  });
                }
              );
            })
            .catch(err => res.status(400).json({ msg: "Cannot add user" }));
        });
      });
    })
    .catch(err => res.status(400).json({ msg: "Error checking user." }));
});

// updates a group with users and transactions.
function updateGroup(newUser) {
  Group.findOne({ name: newUser.group }).then(group => {
    if (!group) {
      return res.status(400).json({ msg: "Group doesn't exist" });
    }

    group.users.forEach(function(userid) {
      const newTransaction = new Transaction({
        source: newUser.id,
        destination: userid
      });

      newTransaction
        .save()
        .then(() => null)
        .catch(err =>
          res.status(400).json({ msg: "Cannot create transaction", err })
        );
      group
        .updateOne({
          $push: { transactions: newTransaction.id }
        })
        .then(() => null)
        .catch(err => res.status(400).json("Couldn't add to group."));
    });
    group
      .updateOne({ $push: { users: newUser.id } })
      .then(() => null)
      .catch(err => res.status(400).json("Couldn't add to group."));
  });
}

module.exports = router;
