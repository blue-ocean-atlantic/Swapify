import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar.jsx';
import LoginButton from './LoginButton.jsx';
import UserInfo from './UserInfo.jsx';
import Posts from './Posts.jsx';
import ChatButton from './ChatButton.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';

import dashStore from './dashStore.js';
import './Dashboard.scss';

function Dashboard() {
  const userInfo = dashStore((state) => state.userInfo);
  // notes for later
  // return (
  // <div>
  //   <a href="/">Home (anchor)</a>
  //   <br />
  //   <Link to="/">Home (Link)</Link>
  //   <br />
  //   <h1>Dashboard</h1>
  // </div>
  // );

  return (
    <div className="dash-page">
      <NavBar />
      <h1 className="dash-greeting">Welcome {`${userInfo.user_first_name} ${userInfo.user_last_name}`}!</h1>
      <div className="dash-container">
        <div className="dash-basic-info">
          <UserInfo />
          <ChatButton />
        </div>
        <div className="dash-user-post">
          <Posts />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
