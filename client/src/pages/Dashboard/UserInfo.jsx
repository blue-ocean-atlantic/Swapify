import React, { useEffect } from 'react';

import { Avatar } from '@mantine/core';

import axios from 'axios';

import dashStore from './dashStore.js';
import NavBar from '../../components/NavBar/NavBar.jsx';
import './UserInfo.scss';

function UserInfo() {
  // call zustand variables here
  const userInfo = dashStore((state) => state.userInfo);
  const setUserInfo = dashStore((state) => state.setUserInfo);

  // on page load: grab db data for specific user

  // useEffect(() => {
  //   axios({
  //     url: '/userInfo',
  //     method: 'GET',
  //   })
  //     .then((data) => {
  //       // store info in zustand
  //       setUserInfo(data.data);
  //     })
  //     .catch((err) => {
  //       console.log('ERROR! couldn"t get user info from DB because :', err);
  //     })
  // });

  // use variable populate return with real data
  return (
    <div>
      <Avatar
        src={userInfo.profile_image}
        alt={`${userInfo.user_first_name} ${userInfo.user_last_name}`}
        radius="xl"
        size={300}>
        {`${userInfo.user_first_name[0]} ${userInfo.user_last_name[0]}`}
      </Avatar>
      <div className="user-info">
        <h4>username: {userInfo.username}</h4>
        <h3>{userInfo.personal_rating} out of 5 stars</h3>
      </div>
    </div>
  );
}

export default UserInfo;