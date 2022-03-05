const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

router.post('/createuser', [
  body('name', "Enter a vaild name").isLength({ min: 3 }),
  body('email', "Enter a vaild email").isEmail(),
  body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry this email is already exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    res.json(user)
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: "Some error occured" })
  }
})

module.exports = router