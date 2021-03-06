const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var  fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SERECT = "Hello"
// CreateUser
router.post('/createuser', [
  body('name', "Enter a vaild name").isLength({ min: 3 }),
  body('email', "Enter a vaild email").isEmail(),
  body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry this email is already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SERECT);
    success=true;
    res.json({success,authtoken})
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: "Internal Server Error" })
  }
})
// Authentication login 
router.post('/loginuser', [
  body('email', "Enter a vaild email").isEmail(),
  body('password', "Password cant be blank").exists(),
], async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body
  try {
    let user = await User.findOne({email});
    if(!user){
    success = false
    return res.status(400).json({error: "Invalid email/password" });
    }
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
    success=false
    return res.status(400).json({success,error: "Invalid email/password" });
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SERECT);
    success=true
    res.json({success,authtoken})
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: "Internal Server Error" })
  }
})

// getuser
router.post('/getuser',fetchuser, async (req, res) => {

  try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal Server Error" })
  }
})
module.exports = router