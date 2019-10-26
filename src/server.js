const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
    origin:"http://localhost:4200" 
}));

var jwtSecret = "Marlabs$Piscatway&PleasantView$Edison"
const conn_string ="mongodb://localhost:27017/assessment2";

mongoose.connect(conn_string, {useNewUrlParser:true})
.then( ()=>{    
    console.log("database connected!!");
})
.catch((exp)=>{   
    console.log(exp.message);
});


const userSchema = mongoose.Schema({
    "username":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true
    },
    "firstname":{
        type:String,    
    },
    "lastname":{
        type:String,
        required:true
    }
});

const postSchema = mongoose.Schema({
  "post_title":{
    type:String,
    required:true
  },
  "post_des":{
    type:String,
    required:true
  },
  "post_creator":{
    type:String,
    required:true
  },
  "likes":{
    type:[String]
  }
});

const commentSchema = mongoose.Schema({
  "comment":{
    type:String, 
    required:true
  },
  "post_id":{
    type:mongoose.Schema.Types.ObjectId,
    ref: "posts"
  } 
});

const userModel = mongoose.model("users", userSchema);
const postModel = mongoose.model("posts", postSchema);
const commentModel = mongoose.model("comments", commentSchema); 


app.post('/registration', async (req, res) => {
    try {
      console.log("abc");
      const values = req.body;
      var result = await userModel.find({ username: values.username});
  
      if (result.length>0) {
        console.log(result);
        res.send({result});
      } else {
        var myData = new userModel(req.body);
        myData.save()
          .then((item) => {
            console.log(item);
            res.status(200).send({item});
          })
      }
    } catch (exp) {
      console.log("exception");
      res.status(400).send(exp.message);
    }
  }); 

app.post('/authenticate', async(req,res)=>{
    try{
      const values = req.body;
      console.log(" values "+ values);
      var item = await userModel.find({username:values.username, password:values.password});
      if(item.length>0){
        console.log(item);
          var token = jwt.sign({"username":req.body.username}, jwtSecret); 
          res.status(200).send({token:token});  
      }
      else{
        console.log("exception frm server TRY block");
          res.status(400).send(res.message);
      }
    }
    catch(exp){
      console.log("exception frm server catch block");
      res.status(400).send("error occured");
    }
  });

app.use((req,res,next)=>{
  var token = req.headers.token ;
  if(!token){
    res.send()
  }
  else{
    jwt.verify(token, jwtSecret,(err,decoded)=>{
      if(err){
        res.send("invalid token");
      }
      else{
        req.decoded = decoded;
        next();
      }
    })
  }
});

app.get("/posts", function(req,resp){
   var username = req.decoded.username;
   if(username.length>0){
     resp.status(200).send({username});
   }
   else{
     resp.status(400).send(resp.message);
   }
});
app.post("/posts", function(req,res){
  var urlData = new postModel(req.body);
  urlData.save()
  .then((data)=>{
    res.status(200).send(data);
  })
  .catch((exp)=>{
    res.status(400).send(exp.message);
  })
});

app.get("/listPosts", async (req, res) => {
  try {
    var postsData = await postModel.find({});
    if (postsData) {
      //console.log(postsData);
      res.status(200).send(postsData);
    }
  }
  catch (exp) {
    res.status(400).send(exp.message);
  }
});

app.post("/comment", function(req,resp){
  var commentVal =new commentModel(req.body);
  commentVal.save()
  .then((data)=>{
    resp.status(200).send(data)
  })
  .catch((exp)=>{
    resp.status(400).send(exp.message)
  })
})


app.post("/getComments", async(req,resp)=>{
  try{
    var comments = await commentModel.find({post_id:req.body.headers.post_id});
    if(comments){ 
      resp.status(200).send(comments)
    }
  }
    catch(exp){
    resp.status(400).send(exp.message)
  } 
})  

app.post("/deletePost", function(req,resp){
    var id = req.body.headers.post_id;
    postModel.deleteOne({_id :id})
    .then((data)=>{
        resp.status(200).send(data);
      })
  .catch((exp)=>{
      resp.status(400).send(exp.message);
  })
}); 

app.post("/edit", function(req,res){
  var newP = req.body;
  postModel.findOneAndUpdate({_id: newP.post_id}, {
    $set:{"post_des": newP.newPost}
  })
  .then((data)=>{
    res.status(200).send(data);
  }) 
  .catch((exp)=>{
    res.status(400).send(exp.message);
  })
});

app.post("/likePost", function(req,res){
  postModel.findOneAndUpdate({_id:req.body.headers.post_id},{$push:{"likes":req.decoded.username}}, {new:true})
  .then((data)=>{
      //console.log(data);
      res.status(200).send({data})
  })
  .catch((exp)=>{
    res.status(400).send(exp.message)
  })
});

app.post("/getLikeUsers", function(req,res){
  postModel.find({_id:req.body.headers.post_id}).distinct('likes')
  .then((data)=>{
    res.status(200).send(data)
    
  })
  .catch((exp)=>{
    res.status(400).send(exp.message)
  })
});

app.post("/numberOfLikes", function(req,res){
  postModel.find({_id:req.body.headers.post_id}, {likes:1}, function(err,postLikes){
    if(!err){
      res.status(200).send(postLikes)
    }
    else{
      res.status(400).send(err)
    }
  })
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("server running @ localhost:"+port);
});