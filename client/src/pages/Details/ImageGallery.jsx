import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './details.scss'

function ImagesGallery({ images }) {

  let imagesDisplay = [];
  if (images === undefined) {
    imagesDisplay = ['https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'];
  } else {
    images.forEach((image) => {
      imagesDisplay.push({ original: image, thumbnail: image })
    });
  }

  return (
    <div className="images-gallery">
      <ImageGallery items={imagesDisplay} />
    </div>
  )
}

export default ImagesGallery;