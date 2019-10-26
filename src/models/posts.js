const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    "post_title":{
        type:String,
        required:true
    },
    "post_description":{
        type:String,
        required:true
    },
    "created_by":{
        type:String,
        required:true
    },
    "comments":{
        type:String,
        multi: true
    }
});

const post = mongoose.model("posts", postSchema);

module.exports = {
    post
}