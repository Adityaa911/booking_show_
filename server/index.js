
const express = require('express');

const app = express()

const mongoose = require('mongoose')

app.use(express.json())
const userrouter = require('./Routes/UserRoute')
const movierouter = require('./Routes/MoviesRoute')
const theatrerouter = require('./Routes/TheatresRoute')
const showsrouter = require('./Routes/ShowRoute')

const cors = require("cors")
app.use(cors({
    origin: "http://localhost:3000"
}));

//const dburl ="mongodb+srv://dukeaddy9_db_user:6TamShc28eTaQker@cluster0.by8p7hu.mongodb.net/bms?appName=Cluster0";
const dburl ="mongodb://dukeaddy9_db_user:6TamShc28eTaQker@ac-ytfuimn-shard-00-00.by8p7hu.mongodb.net:27017,ac-ytfuimn-shard-00-01.by8p7hu.mongodb.net:27017,ac-ytfuimn-shard-00-02.by8p7hu.mongodb.net:27017/bms?ssl=true&replicaSet=atlas-n2jc1c-shard-0&authSource=admin&appName=Cluster0/bms"

app.use('/' ,userrouter )
app.use('/movie',movierouter)
app.use('/theatre' , theatrerouter)
app.use('/shows',showsrouter)

mongoose.connect(dburl).then(()=>{
    console.log("connected to db")
    app.listen(8081,() => {
        console.log("server connected")
    } )
}).catch(err => {
    console.log("DB connection error:", err)
})