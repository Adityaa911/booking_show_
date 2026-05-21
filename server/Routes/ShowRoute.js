
const express = require('express')
const router = express.Router();
const shows = require('../Models/ShowsModel');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const Theatre = require('../Models/TheatreModel');


router.post("/add-shows", AuthMiddleware, async (req, res) => {
  try {
    const currentUser = req.user;

    // Check if logged-in user is an owner
    if (!currentUser.isOwner) {
      return res.status(403).send({
        success: false,
        message: "Only owners can add shows",
      });
    }

    // Find selected theatre
    const theatre = await Theatre.findById(req.body.theatres);

    if (!theatre) {
      return res.status(404).send({
        success: false,
        message: "Theatre not found",
      });
    }

    // Verify theatre belongs to logged-in owner
    if (theatre.owner.toString() !== currentUser.userId.toString()) {
      return res.status(403).send({
        success: false,
        message: "You can add shows only to your theatre",
      });
    }

    // Create show
    const newShow = new shows({
      ...req.body,
      Date: new Date(req.body.Date),
    });

    await newShow.save();

    res.send({
      success: true,
      message: "Show added successfully",
      data: newShow,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});


router.get('/all-shows', async (req, res) => {
  try {
    const allShows = await shows.find().populate("movie").populate("theatres");
    console.log(allShows);
    res.send({
      success: true,
      message: "All Shows",
      data: allShows
    });
  } catch (error) {
    res.send({
      success: false,
      message: "invalid shows"
    });
  }
});

router.put("/update-show/:id", AuthMiddleware, async (req, res) => {
  try {
    const updated = await shows.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updated);

    res.send({
      success: true,
      message: "Show updated",
      data: updated
    });
  } catch {
    res.send({
      success: false,
      message: "Update failed"
    });
  }
});

router.delete("/delete-show/:id", async (req, res) => {
  try {
    await shows.findByIdAndDelete(req.params.id);
    console.log("Deleted show with ID:", req.params.id);

    res.send({
      success: true,
      message: "Show deleted"
    });
  } catch {
    res.send({
      success: false,
      message: "Delete failed"
    });
  }
});


router.get(
  "/owner-shows",
  AuthMiddleware,
  async (req, res) => {
    try {

      // owner theatres
      const ownerTheatres = await Theatre.find({
        owner: req.user.userId
      });

      const theatreIds = ownerTheatres.map(
        theatre => theatre._id
      );

      // owner shows
      const result = await shows.find({
        theatres: { $in: theatreIds }
      })
        .populate("movie")
        .populate("theatres");

      res.send({
        success: true,
        data: result
      });

    } catch (error) {

      console.log(error);

      res.send({
        success: false,
        message: "Failed to fetch owner shows"
      });
    }
  }
);

router.post('/get-all-theatres-by-movie', async (req, res) => {
  try {
    const { movie, date } = req.body;

    // Fetch matching shows
    const fetchedShows = await shows
      .find({ movie, date })
      .populate('theatres');

    // Group shows by theatre
    let uniqueTheatres = [];

    fetchedShows.forEach((show) => {
      const isTheatre = uniqueTheatres.find(
        (theatre) =>
          theatre._id.toString() === show.theatres._id.toString()
      );

      if (!isTheatre) {
        const showsOfThisTheatre = fetchedShows.filter(
          (showObj) =>
            showObj.theatres._id.toString() ===
            show.theatres._id.toString()
        );

        uniqueTheatres.push({
          ...show.theatres._doc,
          shows: showsOfThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      message: 'Shows by theatre',
      data: uniqueTheatres,
    });
  } catch (err) {
    console.log(err);

    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post('/get-all-shows-by-theatre',  async (req, res) => {
    try{
        const show = await shows.find({theatre: req.body.theatreId}).populate('movie')
        res.send({
            success: true,
            message: "All shows fetched",
            data: shows
        });
        // console.log(req.body, res.data, shows)
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

router.post('/get-show-by-id',  async (req, res) => {
    try{
        const show = await Show.findById(req.body.showId).populate('movie').populate('theatre');
        res.send({
            success: true,
            message: 'Show fetched!',
            data: show
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router