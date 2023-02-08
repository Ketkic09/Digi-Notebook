const mongoose = require('mongoose')
require('dotenv').config()

//const mongoURI = "mongodb://localhost:27017/diginotebook"
const mongoURL = process.env.DATABASE 
const connectToMongo = () =>{
    mongoose.connect(mongoURL,()=>{
        console.log("Successfully connected to mongo db")
    })
}

module.exports = connectToMongo;