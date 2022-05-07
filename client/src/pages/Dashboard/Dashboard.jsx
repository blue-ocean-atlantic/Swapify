import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <main>
      <a href="/">Home (anchor)</a>
      <br />
      <Link to="/">Home (Link)</Link>
      <br />
      <h1>Dashboard</h1>
    </main>
  );
}

export default Dashboard;
