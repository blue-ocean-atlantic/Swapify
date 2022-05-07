import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar.jsx';

function Home() {
  return (
    <>
      <NavBar />
      <main>
        <h1>1</h1>
        <a href="/dashboard">Link to Dashboard (anchor)</a>
        <br />
        <Link to="/dashboard">Link to Dashboard (Link)</Link>
        <h1>2Home</h1>
        <h1>3Home</h1>
        <h1>4Home</h1>
        <h1>5Home</h1>
        <h1>6Home</h1>
        <h1>7Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
      </main>
    </>
  );
}

export default Home;

// const request = '/api/listings/landing'; // GET
// const dreamData = {
//   results: [
//     {
//       listing_id: Number,
//       type: String, // "swap" or "favor"
//       title: String,
//       description: String,
//       image_url: String,
//       user_id: String, // Should be same as email I think
//       user_avatar_url: String,
//     },
//   ],
// };

// const request = "/api/listings";
// const dreamData = {
//   "results": [
//      {
//         "listing_id":19975,
//         "type":"swap",
//         "title":"Chair",
//         "description":"This is a chair in good condition, I bought it a while ago but don't need it anymore. Open to see what you want to trade!",
//         "image_url":"https://imagekit.io/url-path",
//         "username":"joshandromidas@gmail.com",
//         "user_avatar_url":"https://imagekit.io/avatar-pic-url-path"
//      },
//      ...
//   ]
// }
