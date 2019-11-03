const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please fill out all fields" });
  }

  // check for user
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: "User already exists" });

      const newUser = new User({
        name,
        email,
        password
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
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;

                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
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

module.exports = router;
