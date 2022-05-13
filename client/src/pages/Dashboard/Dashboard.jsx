import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import UserInfo from './UserInfo.jsx';
import Posts from './Posts.jsx';
import ChatButton from './ChatButton.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';

import { Title, Container } from '@mantine/core';

import dashStore from './dashStore.js';
import './Dashboard.scss';

function Dashboard() {
  // const userInfo = dashStore((state) => state.userInfo);
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

  const [userInfo, setUserInfo] = useState({});
  console.log('🚀 ~ Home ~ userInfo', userInfo);
  // debugger;

  useEffect(() => {
    const username = document.cookie.split('=')[1]; // = ''
    console.log(username)
    // debugger;

    const getUser = async () => {
      try {
        const user = await axios.get('http://localhost:3005/api/username', { params: { username } }); // -> { userinfo }
        setUserInfo(user.data[0]);
        console.log('user :', user)
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="dash-page">
      <NavBar />
      <main>
        <Container
          className="dash-mant-container"
          radius="xl"
          p={30}
          style={{ backgroundColor: 'white', borderRadius: 15 }}
        >
          <Title className="dash-greeting">Welcome {`${userInfo.first_name} ${userInfo.last_name}`}!</Title>
          <div className="dash-container">
            <div className="dash-basic-info">
              <UserInfo userInfo={userInfo} />
              <ChatButton />
            </div>
            <div className="dash-user-post">
              <Posts />
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
