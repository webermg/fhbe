const express = require("express");
const router = express.Router();
const db = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const API = require("../utils/API");
require("dotenv").config()

router.use(cors( {origin: ["http://localhost:3000","https://plantit-site.herokuapp.com"]} ))



// Login Route
router.post("/login", async (req, res) => {
    db.User.findOne({email: req.body.email})
      .then(async foundUser => {
          if (!foundUser) {
            return res.status(404).send("user not found")
          } else {
            return foundUser;
          } 
      })
      .then(function(validUser) {
          if(!validUser.samePassword) {
              res.status(403).send("wrong password");
          } else {
              const userInfo = {
                  email: validUser.foundUser.email,
                  username: validUser.foundUser.username,
                  id: validUser.foundUser._id,
                  expenses: validUser.expenses
              }
              
              return res.status(200).json(userInfo)
         }
      }) 
      .catch(function(error){
          console.log("Error authenticating user: ");
      });
})

// Finds user information by ID
router.get("/user/:id", (req, res) => {
  db.User.findById(req.params.id)
  .select("username email expenses")
  .lean().then(dbUsers => {
    res.json(dbUsers)
  })
  .catch(err => {
    res.send(err)
  })
})

// router.put("/user/:id/garden", (req,res) => {
    
//         db.User.findOneAndUpdate({ _id: req.params.id }, {myGarden:req.body.myGarden})
//             .then((result) => {
//              return res.json(result)
//         })
//          .catch((err) => {
//             return res.json(err)
//         })
    
// })

// router.put("/user/:id/gardenimg", (req,res) => {
    
//         db.User.findOneAndUpdate({ _id: req.params.id }, {myGardenImg:req.body.myGardenImg})
//             .then((result) => {
//              return res.json(result)
//         })
//          .catch((err) => {
//             return res.json(err)
//         })
    
// })

// router.put("/user/:id/location", (req,res) => {
//     db.User.findOneAndUpdate({_id: req.params.id }, {location: req.body.location})
//     .then((result) => {
//         return res.json(result)
//     })
//     .catch((err) => {
//         return res.json(err)
//     })
// })

// router.put("/user/:id/interests", (req,res) => {
//     db.User.findOneAndUpdate({_id: req.params.id }, {interests: req.body.interests})
//     .then((result) => {
//         return res.json(result)
//     })
//     .catch((err) => {
//         return res.json(err)
//     })
// })

// router.put("/user/:id/skills", (req,res) => {
//     db.User.findOneAndUpdate({_id: req.params.id }, {skills: req.body.skills})
//     .then((result) => {
//         return res.json(result)
//     })
//     .catch((err) => {
//         return res.json(err)
//     })
// })

module.exports = router;