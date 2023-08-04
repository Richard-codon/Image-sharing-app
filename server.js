//import dependencies
const express = require('express');// express provides routing and middleware functionalities
const app = express();
const bodyParser = require('body-parser');// package for parsing incoming body request
const cors = require('cors');// cross-origin resource sharing for security features 
const multer = require('multer');// package for handling multipart in this case form data for uploading the files(image)
const path = require('path'); // built in module for handling paths of files

//middleware functions to have access to request and response objects
app.use(cors());// for cross origin requests
app.use(bodyParser.json());// for parsing incoming JSON data from requests

//declaring an array to store information about uploaded images including the urls, likes dislikes and comments
const images = [];

// Configure multer to save uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // this function generates unique file name for every uploaded file/image
  filename: function (req, file, cb) {
    const imageID = generateUniqueImageID();
    cb(null, `${imageID}.jpg`);
  },
});

// declaring a variable for creating a multer middleware using the already defined storage configuration
const upload = multer({ storage: storage });

app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  images.push({ url: imageUrl, likes: 0, dislikes: 0 , comments:[] });
  res.json({ imageUrl });
});

app.get('/images', (req, res) => {
  res.json(images);
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);//this helps me know the port on which the backend server is running
});

function generateUniqueImageID() {
  return Date.now().toString();
}

