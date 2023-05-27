const multer = require("multer");
const uploadController = require("express").Router();

// destination means -> where the image will be saved
// filename means -> what will be the name of the saved images

const storage = multer.diskStorage({
  destination: (req, res) => {
    cb(null, "public/image");
  },
  filename: (req, res) => {
    cb(null, req.body.filename);
  },
});
const upload = multer({
  storage,
});

// upload.single('images') is going to check in the req. body for the req.body.images
uploadController.post("/image", upload.single("image"), async (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

module.exports = uploadController;
