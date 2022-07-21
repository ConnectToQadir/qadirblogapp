const router = require('express').Router();
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");



// Update User
router.put("/:id", async (req,resp)=>{
    if(req.body.userId == req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try {
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            resp.status(200).send("Updatad User => "+updatedUser);
        } catch (error) {
            resp.status(500).json(error);
        }
    }else{
        resp.status(401).json("You can only update your account")
    }
});

// Delete User
router.delete("/:id", async (req,resp)=>{
    if(req.body.userId == req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try {
            const deletedUser = await userModel.findByIdAndDelete(req.params.id);
            resp.status(200).send(deletedUser.username+ " => user has been deleted!");
        } catch (error) {
            resp.status(500).json(error);
        }
    }else{
        resp.status(401).json("You can only delete your account")
    }
})

// Get User
router.get("/:id",async (req,resp)=>{
    try {
        const user = await userModel.findById(req.params.id);
        const {password,...others} = user._doc;
        resp.status(200).send(others);
    } catch (error) {
        resp.status(500).send(error);
    }
})

module.exports = router;