//import module from the react library
import React, { useState } from 'react';
import './ImageUpload.css'; // You can create a CSS file for styling if needed

//the main functional component and it takes in onImageUpload as a parameter or prop
const ImageUpload = ({ onImageUpload }) => {
  //defining state for the image selected and sets it initially to null
  const [selectedImage, setSelectedImage] = useState(null);
  
  //function that is called when a file(image) is selected
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  
  //this function handles the upload process by constructing a form data and sends a post request to the server
  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const response = await fetch('http://localhost:5000/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const uploadedImageUrl = await response.json();
          console.log('Uploaded Image URL: ', uploadedImageUrl.imageUrl);
          onImageUpload(uploadedImageUrl.imageUrl); // Extract the imageUrl property
        } else {
          console.error('Failed to upload image');//for debugging purposes
        }
      } catch (error) {
        console.error('Error uploading image', error);//for debugging purposes
      }
    }
  };
 
  //JSX that defines the structure and content of the page
  return (
    <div className="image-upload-container">
      <div className="upload-buttons">
        <label className="choose-file-label" htmlFor="upload-input">
          Choose File
        </label>
        <input
          type="file"
          id="upload-input"
          className="upload-input"
          onChange={handleFileChange}
        />
        <button className="upload-button" onClick={handleUpload}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
