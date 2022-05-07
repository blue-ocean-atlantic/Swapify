import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <a href="/">Home (anchor)</a>
      <br />
      <Link to="/">Home (Link)</Link>
      <br />
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
