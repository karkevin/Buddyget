const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   POST api/auth
// @desc    Authenticate a user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Please fill out all fields" });
  }

  // check for user
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "User already exists" });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        // if there is a match, send user and token.
        jwt.sign(
          { id: user.id },
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
      });
    })
    .catch(err => res.status(400).json({ msg: "Error checking user." }));
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
