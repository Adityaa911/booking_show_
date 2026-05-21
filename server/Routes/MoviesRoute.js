
const express = require("express")
const router = express.Router()
const movie = require('../Models/MoviesModel')

router.post('/add-movies' , async (req,res) =>{
    try{
        const newMovie = new movie(req.body)
        console.log(newMovie)
         await newMovie.save();

         res.send({
            success : true,
            message : "new movie added"
    })
    }catch(error){
        res.send({
            success : false,
            message : error.message
        })
    }
})
router.get('/movies/:id', async (req, res) => {
    try {
        const movies = await movie.findById(req.params.id);
        res.send({
            success: true,
            message: "movie fetched successfully",
            data: movies
        })
    } catch (error) {
        res.send({
            success: false,
            message: "invlaid movie",
        })
    }

})

router.get('/all-movies', async (req,res)=>{
   try {
     const allmovies = await movie.find();
     res.send({
         success : true,
         message : "all movies",
         data : allmovies
     })
   } catch (error) {
    res.send({
         success : false,
         message : "invalid movies",
     })
   } 
})
router.put('/Update-movie/:id', async (req,res)=>{
   try {
     const movies = await movie.findByIdAndUpdate(req.params.id,req.body);
     res.send({
         success : true,
         message : " movie updated",
         data : movies
     })
   } catch (error) {
    res.send({
         success : false,
         message : "invalid movies",
     })
   } 
})
router.delete('/delete-movie/:id', async (req,res)=>{
   try {
      await movie.findByIdAndDelete(req.params.id);
     res.send({
         success : true,
         message : " movie deleted",
     })
   } catch (error) {
    res.send({
         success : false,
         message : "invalid movies_id",
     })
   } 
})

module.exports = router