const router = require('express').Router();
const postModel = require("../Models/postModel");


// Create New Post
router.post("/newpost", async(req,resp)=>{
    try {
        const newPost = new postModel(req.body);
        const savedPost = await newPost.save();
        resp.status(200).send(savedPost);
    } catch (error) {
        resp.status(500).send("Error while saving new Post in DB => "+ error);
    }
});


// Deleting Existing Post
router.delete("/:id", async(req,resp)=>{
    try {
        const post = await postModel.findById(req.params.id);
        if(req.body.username==post.username){
            if(req.body.postId==req.params.id){
                const deletedPost = await postModel.findByIdAndDelete(req.params.id);
                resp.status(200).send("Post has been deleted with title => "+deletedPost.title)
            }else{
                resp.status(401).send("Unkown Post id sent!")
            }
        }else{
            resp.status(401).send("You can only delete your own posts!")
        }
    } catch (error) {
        resp.status(500).send("Error while deleting this post => " +error)
    }

})

// Updating Existing Post
router.put("/:id", async(req,resp)=>{
    try {
        const post = await postModel.findById(req.params.id);
        if(req.body.username==post.username){
            if(req.body.postId==req.params.id){
                const updatedPost = await postModel.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true});
                resp.status(200).send(updatedPost)
            }else{
                resp.status(401).send("Unkown Post id sent!")
            }
        }else{
            resp.status(401).send("You can only Update your own posts!")
        }
    } catch (error) {
        resp.status(500).send("Error while Updating this post => " +error)
    }

})

// Getting single Post
router.get("/:id", async(req,resp)=>{
    try {
        const post = await postModel.findById(req.params.id);
        resp.status(200).send(post);
    } catch (error) {
        resp.status(500).send("Error while Getting this post => " +error)
    }
})

// Getting All posts
router.get("/", async(req,resp)=>{
    try {
        const user = req.query.user;
        const catPosts = req.query.cat;
        let posts;
        if(user){
            posts = await postModel.find({username:user});
        }else if (catPosts){
            posts = await postModel.find({categories:{
                $in : [catPosts]
            }});
        }else{
            posts = await postModel.find();
        }

        resp.status(200).send(posts);
    } catch (error) {
        resp.status(500).send(error);
    }
})


module.exports = router;