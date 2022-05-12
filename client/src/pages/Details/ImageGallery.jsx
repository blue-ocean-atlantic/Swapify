import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './details.scss'

function ImagesGallery({ images }) {

  const imagesDisplay = [];
  images.forEach((image) => {
    imagesDisplay.push({original: image, thumbnail: image})
  });

  return (
          <div className="images-gallery">
            <ImageGallery items={imagesDisplay} />
          </div>
  )
}

export default ImagesGallery;