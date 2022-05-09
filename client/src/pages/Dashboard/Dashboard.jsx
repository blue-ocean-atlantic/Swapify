import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar.jsx';
import LoginButton from './LoginButton.jsx';
import UserInfo from './UserInfo.jsx';
import Posts from './Posts.jsx';
import ChatButton from './ChatButton.jsx';

import dashStore from './dashStore.js';

function Dashboard() {
  const userInfo = dashStore((state) => state.userInfo);
  // notes for later
  // return (
  //   <div>
  //     <a href="/">Home (anchor)</a>
  //     <br />
  //     <Link to="/">Home (Link)</Link>
  //     <br />
  //     <h1>Dashboard</h1>
  //   </div>
  // );
  return (
    <div className="dash-page">
      <div className="dash-nav-bar">
        <h4>Logo</h4>
        <SearchBar />
        <h4>Welcome {userInfo.username}!</h4>
        <LoginButton />
      </div>
      <div className="dash-basic-info">
        <UserInfo />
        <Posts />
        <ChatButton />
      </div>
    </div>
  );
}

export default Dashboard;
