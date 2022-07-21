const router = require('express').Router();
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");


//Register
router.post("/register", async (req, resp) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            profilePic:req.body.profilePic
        });
        const savedUser = await newUser.save();
        resp.status(200);
        resp.send(savedUser);
    } catch (error) {
        resp.status(500).json(error)
    }
});

//Login
router.post("/login", async (req, resp) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });
        if (!user) {
            resp.status(500).json("Wrong Credentials!");
        } else {
            const validated = await bcrypt.compare(req.body.password, user.password);
            if (!validated) {
                resp.status(500).json("Wrong Credentials!");
            } else {
                const { password, ...others } = user._doc;
                resp.status(200).json(others);
            }
        }



    } catch (error) {
        resp.status(500).json(error)
    }

})

module.exports = router;