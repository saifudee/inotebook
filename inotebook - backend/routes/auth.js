const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');

router.get('/',[
    body('name',"Enter a vaild name").isLength({ min: 3 }),
    body('email',"Enter a vaild email").isEmail(),
    body('password',"Enter a passowrd with min length 5 characters").isLength({ min: 5 }),
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)
        res.json({error:"Please enter a unique value for email",message:err.message})
      })
})

module.exports=router