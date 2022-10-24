const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/diginotebook"

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Successfully connected to mongo db")
    })
}

module.exports = connectToMongo;