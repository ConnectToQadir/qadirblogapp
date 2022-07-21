const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userAuth = require("./Routes/auth");
const userRoute = require("./Routes/users");
const postRoute = require("./Routes/posts");
const catRoute = require("./Routes/categories")
const cors = require("cors")
const multer = require('multer')
const path = require('path')
const fs = require("fs")


// Middlewares
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/api/auth", userAuth);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/cate", catRoute);


// Connecting to Database
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to DB")).catch((err) => {
  console.log("Not Connected to DB => " + err)
});


// Image File Uploading API
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


// Image File Deleting API
app.post("/api/deleteImage", (req, res) => {
  try {
    const imgName = req.body.imgName;
    fs.unlink(`./images/${imgName}`, function (err) {
      if (err) throw err;
    });
    res.status(200).send("Image Deleted Successfully!")
  } catch (error) {
    res.status(500).send("Something Went Wrong While Deleting Image")
  }
})


// Server Management Code
const PORT = process.env.PORT || 5000;
if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}
app.listen(PORT, () => {
  console.log("Backend is running on 5000 post...")
});

