const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://AswathyKiran:Pulser90@cluster0.zos2ha5.mongodb.net/?retryWrites=true&w=majority");



const Schema = mongoose.Schema;

var movieSchema = new Schema({
    movie : String,
    actor : String,
    actress : String,
    director : String,
    year :Date,
    camera:String,
    producer:String,
    language:String
})

var MovieInfo = mongoose.model("moviess" ,movieSchema)

module.exports = MovieInfo;