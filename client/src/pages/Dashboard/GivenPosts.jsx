import React from 'react';
import { Link } from 'react-router-dom';

import dashStore from './dashStore.js';
// import { active, given, received } from './dashDummy.js'
// import { data } from '../Home/dummy.js';

import { Title, Container } from '@mantine/core';

function GivenPosts() {

  const givenPosts = dashStore((state) => state.givenPosts);

  const mapPosts = (data) => {

    return data.map((listing) => {

      return (
        <Container key={listing.listing_id} style={{ display: "flex", minHeight: "110px", width: "550px", margin: "5px 0px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "5px", alignItems: "center" }}>
          <img style={{ height: "100px", width: "100px" }} src={listing.images_urls[0]} component={Link} to={`/details/${listing.listing_id}`}></img>
          <div style={{ minHeight: "100px", width: "400px" }}>
            <Title order={3} component={Link} to={`/details/${listing.listing_id}`}>
              {listing.title}
            </Title>
            <p>{listing.description}</p>
          </div>
        </Container>
      )
    })
  }

  return (
    <>
      {/* currently using dummy data being imported */}
      {mapPosts(givenPosts)}
    </>
  )
}

export default GivenPosts;