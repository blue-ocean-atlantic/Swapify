import React, { useEffect } from 'react';

import NewPostButton from './NewPostButton.jsx';

import dashStore from './dashStore.js';

import './Posts.scss';
import { Button } from '@mantine/core';

function Posts() {
  // get all posts on page load (send all three requests at once)
  // store data in separate in variables in zustand store
  //

  return (
    <div className="dash-all-posts">
      <div className="dash-post-tabs">
        <Button color="orange" radius="md" size="sx" onClick={() => console.log('hi from active')}>Active</Button>
        <Button color="orange" radius="md" size="sx" onClick={() => console.log('hi from Given')}>Given</Button>
        <Button color="orange" radius="md" size="sx" onClick={() => console.log('hi from Received')}>Received</Button>
      </div>
      <div className="dash-post-box">
        <NewPostButton />
        <ul>
          <li>Post</li>
          <li>Post</li>
          <li>Post</li>
          <li>Post</li>
        </ul>
      </div>
    </div>

  )
}

export default Posts;