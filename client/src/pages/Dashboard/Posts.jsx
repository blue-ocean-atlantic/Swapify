import React from 'react';
import { Button } from '@mantine/core';

function Posts() {
  return (
    <div className="dash-all-posts">
      <div className="dash-post-tabs">
        <Button color="orange" radius="md" size="md">Active</Button>
        <Button color="orange" radius="md" size="md">Given</Button>
        <Button color="orange" radius="md" size="md">Receive</Button>
      </div>
      <div className="dash-post-box">
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