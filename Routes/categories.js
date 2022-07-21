const categoryModel = require("../Models/categoryModel");
const router = require('express').Router();


// Adding new category
router.post("/addCat",async(req,resp)=>{
    try {
        const newCat = new categoryModel(req.body);
        const savedNewCat =await newCat.save();
        resp.status(200).json(savedNewCat);
    } catch (error) {
        resp.status(500).json(error)
    }
});


// Get All categories
router.get("/categories",async(req,resp)=>{
    try {
        const savedNewCat =await categoryModel.find();
        resp.status(200).json(savedNewCat);
    } catch (error) {
        resp.status(500).json(error)
    }
});

module.exports = router;