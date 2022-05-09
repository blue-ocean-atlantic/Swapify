import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { ownerProfile, listingInfo}  from './dummyData.js';
import ImagesGallery from './ImageGallery.jsx';
import ListingDetails from './ListingDetails.jsx';
import OwnerProfile from './ownerProfile.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';

function Details() {
  console.log(listingId);
  const { listingId } = useParams();
  const [images, setImages] = useState(['https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640']);
  useEffect(() => {
    setImages(listingInfo.listingImages)
  });

  return (
          <div className="details-page">
            <NavBar />
            <main>
              <Grid>
                <Grid.Col span={8}><ImagesGallery images={images}/></Grid.Col>
                <Grid.Col span={4}><ListingDetails /></Grid.Col>
                <Grid.Col span={8}>map</Grid.Col>
                <Grid.Col span={4}><OwnerProfile /></Grid.Col>
              </Grid>
            </main>
          </div>
  )
}

export default Details;
