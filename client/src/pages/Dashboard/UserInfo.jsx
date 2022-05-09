import React from 'react';

import dashStore from './dashStore.js';

function UserInfo() {
  // on page load: grab db data for specific user
  // store info in zustand
  // call zustand variable here
  // use variable populate return with real data
  const userInfo = dashStore((state) => state.userInfo);
  const setUserInfo = dashStore((state) => state.setUserInfo);
  console.log(userInfo);
  return (
    <div>
      <img src={userInfo.profile_image}></img>
      <h4>{userInfo.user_first_name}</h4>
      <h4>{userInfo.user_last_name}</h4>
      <h3>{userInfo.personal_rating} out of 5 stars</h3>
    </div>
  );
}

export default UserInfo;