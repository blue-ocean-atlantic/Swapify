import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mantine/core';
import ownerProfile from './dummyData.js';
import listingInfo from './dummyData.js';
import ImageGallery from './ImageGallery.jsx';
import ListingDetails from './ListingDetails.jsx';
import OwnerProfile from './ownerProfile.jsx';

function Details() {
  const { listingId } = useParams();
  const [images, setImages] = useState('https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640');

  return (
          <div>
            <h3>ID: {listingId}</h3>
            <Grid>
              <Grid.Col span={8}><ImageGallery /></Grid.Col>
              <Grid.Col span={4}><ListingDetails /></Grid.Col>
              <Grid.Col span={8}>map</Grid.Col>
              <Grid.Col span={4}><OwnerProfile /></Grid.Col>
            </Grid>
          </div>
  )
}

export default Details;
