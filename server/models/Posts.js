var mongoose = require('mongoose')

var postsSchema = {
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    link:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now()
    }
}
var Posts = module.exports = mongoose.model('Posts',postsSchema,'userPosts')

module.exports.getPosts = function(callback,limit){
Posts.find(callback).limit(limit)
}
module.exports.addPosts = function(Post,callback){
    Posts.create(Post,callback)
}
module.exports.updatePost = function(id,Post,options,callback){
    var query={_id:id}
    var update={
        title:Post.title,
        description:Post.description,
        link:Post.link
    }
    Posts.findOneAndUpdate(query,update,{},callback)
}
module.exports.deletePost = function(id,callback){
    var query={_id:id}
Posts.findOneAndDelete(query,callback)
}