
const express = require("express");

const MovieInfo = require('./model/movieDb')

const app = new express();

const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})
app.get('/',(req,res)=>{
      res.send("Congratulations!!!!!,Server is Up");
})


app.post('/api/create',(req,res)=>
{
    try{
    let course = new MovieInfo(req.body); 
    course.save();
    console.log(req.body)
    res.send("Data Added")
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get('/api/view',async (req,res)=>{
    try{ 
      let result = await MovieInfo.find();
      res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})
app.post('/api/update',async (req,res)=>{
    try{
    let result = await MovieInfo.findByIdAndUpdate(req.body._id,req.body);
    res.send("Data Updated")
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/api/delete',async (req,res)=>{
   try{
    let result = await MovieInfo.findByIdAndDelete(req.body._id);
    res.send("Data Deleted");
   }
   catch (error) {
    res.status(500).send(error);
}
})

app.post('/api/get/',async (req,res) => {
    console.log(req.body)
    try{
        let result = await MovieInfo.findById(req.body._id);
        res.json(result);
        console.log(result)
       }
       catch (error) {
        res.status(500).send(error);
    }
})
app.post('/api/search',async (req,res) => {
    try{
        // let result = await CourseInfo.find(req.body);
        let result = await MovieInfo.find({ "movie": { $regex: '.*' + req.body.movie + '.*' } });
        console.log(result)
        res.json(result);
       }
       catch (error) {
        res.status(500).send(error);
    }
})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });
//4. Setting PORT Number
app.listen(5000,()=>
{
    console.log("Server is running in port 5000");
})