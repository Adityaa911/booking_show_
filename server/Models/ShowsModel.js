
const mongoose = require('mongoose');


const showsSchema = new mongoose.Schema({
   name :{
    type: String,
        required: true
   },

    Date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },

    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
    },
    ticketPrice: {
        type: Number,
        required: true
    },

    totalSeats: {
        type: Number,
        required: true
    },
    bookedSeats: {
        type: Array,
        default: []
    },
    theatres: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatres'
    },
    showType: {
        type: String,
        enum: ["morning", "afternoon", "evening", "night"],
        required: false
    }

})

const ShowsModel = mongoose.model('Shows', showsSchema)

exports.default = ShowsModel;