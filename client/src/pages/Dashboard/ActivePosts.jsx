import React from 'react';
import dashStore from './dashStore.js';
import { active, given, received } from './dashDummy.js'
import { Title, Container } from '@mantine/core';

function ActivePosts() {

  const activePosts = dashStore((state) => state.activePosts);

  const mapPosts = (data) => {
    // iterate over collection of posts
    return data.map((post) => {
      return (
        <Container key={post.post_id}>
          <Title>{post.title}</Title>
          <h3>{post.message}</h3>
          <img src={post.images[0].thumbnail_url}></img>
        </Container>
      )
    })
  }

  return (
    <ul>
      {/* currently using dummy data being imported */}
      {mapPosts(active)}
    </ul>
  )
}

export default ActivePosts;