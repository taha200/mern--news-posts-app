var express = require('express');
var path = require('path')
// var mongojs = require('mongojs')
var Mongoose = require('mongoose')
var cors = require('cors')
Mongoose.connect('mongodb://teddy:teddy123@ds115664.mlab.com:15664/userposts',{ useNewUrlParser: true })
var db = Mongoose.connection
//var db = mongojs('mongodb://taha200:abc123@ds111244.mlab.com:11244/userpostsnews', ['userPosts'])
// create an express app
Posts = require('./models/Posts')
var app = express();
// let ObjectId = mongojs.ObjectID
var bodyParser= require('body-parser')
app.use(cors())
app.use(bodyParser.json())  //Body Parser MiddleWare
app.use(express.json())
// create an express route for the home page
// http://localhost:8080/

app.get('/', function(req, res) {
//   db.userPosts.find(function (err, docs) {
//     if(err)
//     console.log(err)
//     else{
//    console.log(docs)
//    res.send(docs)
//     }
// })
Posts.getPosts(function(err,docs){
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
    Posts.addPosts(userPost,function (err, docs) {
                if(err)
                console.log(err)
                else{
               console.log(docs)
               res.json(docs)
                }
        })
//     db.userPosts.insert(userPost,function (err, docs) {
//         if(err)
//         console.log(err)
//         else{
//        console.log(docs)
//        res.json(docs)
//         }
// });
})
app.delete('/users/remove/:_id',function(req,res){
    let id = req.params._id
    console.log(id)
    Posts.deletePost(id,function (err, docs) {
            if(err)
            console.log(err)
            else{
           console.log(docs)
           res.json(docs)
            }
        })
    // db.userPosts.remove({_id:ObjectId(id)},function (err, docs) {
    //     if(err)
    //     console.log(err)
    //     else{
    //    console.log(docs)
    //    res.json(docs)
    //     }
    // })
})
app.put('/users/update/:_id',function(req,res){
    let id = req.params._id
    console.log(id)
    const userPost=req.body
    Posts.updatePost(id,userPost,{},function (err, docs) {
            if(err)
            console.log(err)
            else{
           console.log(docs)
         res.json(docs)
            }
        })
    // db.userPosts.update({_id:ObjectId(id)},{$set: {title:userPost.title,description:userPost.description,link:userPost.link}},function (err, docs) {
    //     if(err)
    //     console.log(err)
    //     else{
    //    console.log(docs)
    //  res.json(docs)
    //     }
    // })
})
// start the server on port 8080
app.listen(8000);
// send a message
console.log('Server has started!');