import React from 'react';

function Posts() {
  return (
    <div className="dash-all-posts">
      <div className="dash-post-tabs">
        <button>Active</button>
        <button>Given</button>
        <button>Receive</button>
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