import React from 'react';
import dashStore from './dashStore.js';
import { active, given, received } from './dashDummy.js'
import { Title, Container } from '@mantine/core';

function ReceivedPosts() {

  const givenPosts = dashStore((state) => state.givenPosts);

  const mapPosts = (data) => {
    // iterate over collection of posts
    return data.map((post) => {
      return (
        <Container key={post.post_id}>
          <Title>{post.title}</Title>
          <h3>{post.message}</h3>
          <span>rating: {post.rating} out of 5 stars</span>
          <img src={post.images[0].thumbnail_url}></img>
        </Container>
      )
    })
  }

  return (
    <ul>
      {/* currently using dummy data being imported */}
      {mapPosts(received)}
    </ul>
  )
}

export default ReceivedPosts;