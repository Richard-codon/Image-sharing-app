//import modules from react library
import React, { useState } from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import ImageCard from './ImageCard';

//the main functional component
const App = () => {
  //defining states to handle image urls and initially setting to an empty array
  const [imageUrls, setImageUrls] = useState([]);
  
  //function to handle image upload 
  const handleImageUpload = (imageUrl) => {
    //function to update the urls of the images 
    setImageUrls([...imageUrls, imageUrl]);
  };

  console.log('imageUrls:', imageUrls); // Adding this console log for debugging purposes
 //JSX for returning the main functional components
  return (
    <div className="App">
      <h1>FreeShow</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      <div className="image-grid">
        {imageUrls.map((imageUrl) => (
          <ImageCard key={imageUrl} imageUrl={imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default App;