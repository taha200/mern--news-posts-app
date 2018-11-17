var express = require('express');
var path = require('path')
var mongojs = require('mongojs')
var cors = require('cors')
var db = mongojs('Posts', ['userPosts'])
// create an express app
var app = express();
var bodyParser= require('body-parser')
app.use(cors())
app.use(bodyParser.json())  //Body Parser MiddleWare
app.use(express.json())
// create an express route for the home page
// http://localhost:8080/
app.get('/', function(req, res) {
  db.userPosts.find(function (err, docs) {
    if(err)
    console.log(err)
    else{
   console.log(docs)
   res.send(docs)
    }
})
});
app.post('/users', function(req, res) {
    var userPost= req.body
    db.userPosts.insert(userPost,function (err, docs) {
        if(err)
        console.log(err)
        else{
       console.log(docs)
       res.json(docs)
        }
});
})
app.delete('/users/remove:_id',function(req,res){
    let id = req.params._id
    db.userPosts.remove(id,function (err, docs) {
        if(err)
        console.log(err)
        else{
       console.log(docs)
       res.json(docs)
        }
    })
})
// start the server on port 8080
app.listen(8000);
// send a message
console.log('Server has started!');