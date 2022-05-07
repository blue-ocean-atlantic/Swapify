import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <a href="/dashboard">Link to Dashboard (anchor)</a>
      <br />
      <Link to="/dashboard">Link to Dashboard (Link)</Link>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
