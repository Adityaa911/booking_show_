const express = require('express')
const router = express.Router();
const theatre = require('../Models/TheatreModel');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const User = require('../models/userModel');

router.post('/add-theatre',AuthMiddleware , async (req,res) =>{
    try{
         let ownerId;
         if (req.userId.isAdmin){
            ownerId = req.body.userId;
         } else {
            ownerId = req.user.userId;
         }
        const newtheatre = new theatre({
            ...req.body,
            owner : ownerId})
         await newtheatre.save();

         res.send({
            success : true,
            message : "New theatre added"
    })
    }catch(error){
        res.send({
            success : false,
            message : error.message
        })
    }
})

    
        router.get("/get-single-theatre/:id", async (req, res) => {
            try{
  const singletheatre = await theatre.findById(req.params.id);
       res.send(
        { success: true,
         data: singletheatre })
    }

      catch(error){
        res.send({
            success : false,
            message : error.message
        })
    }
})



router.get('/get-all-theatre' ,AuthMiddleware, async (req,res) =>{
    try{
        // const alltheatres = await theatre.find().populate('owner')
        //  console.log(alltheatres)
        let alltheatres;

        const user = await User.findById(req.userId);

    if (user.isAdmin) {
      alltheatres = await theatre.find().populate('owner');
    } else {
      alltheatres = await theatre
        .find({ owner: req.userId })
        .populate('owner');
    }  
      

         res.send({
            success : true,
            message : "All theatre",
            data: alltheatres
    })
    // console.log(alltheatres)
    }catch(error){
        res.send({
            success : false,
            message : error.message
        })
    }
})

// router.put('/update-theatre/:id' , async (req,res) =>{
//     try{
//          await theatre.findByIdAndUpdate(req.params.id, req.body)
    
//          res.send({
//             success : true,
//             message : "theatre Updated"
//     })
//     }catch(error){
//         res.send({
//             success : false,
//             message : error.message
//         })
//     }
// })
router.put('/update-theatre/:id' ,AuthMiddleware, async (req,res) =>{
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (
      req.userId.isAdmin ||
      theatre.owner.toString() === req.userId
    ) {
      await Theatre.findByIdAndUpdate(req.params.id, req.body);
      res.send("Updated");
    } else {
      res.status(403).send("Not allowed");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/delete-theatre/:id", async (req, res) => {
  await theatre.findByIdAndDelete(req.params.id);
  res.send({ success: true, message: "Theatre deleted" });
});

router.get('/get-all-theatre-by-owner' ,AuthMiddleware, async (req,res) =>{
    try{
        const alltheatres = await theatre.find({owner : req.userId}).populate('owner')

         res.send({
            success : true,
            message : "All theatre",
            data : alltheatres
    })
    }catch(error){
        res.send({
            success : false,
            message : error.message
        })
    }
})

module.exports = router