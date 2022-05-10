import React, { useEffect } from 'react';
import axios from 'axios';

import NewPostButton from './NewPostButton.jsx';
import dashStore from './dashStore.js';

import './Posts.scss';
import { Button } from '@mantine/core';

function Posts() {
  // get all posts on page load (send all three requests at once)
  // store data in separate in variables in zustand store
  //

  const activeChats = dashStore((state) => state.activeChats);
  const givenChats = dashStore((state) => state.givenChats);
  const receivedChats = dashStore((state) => state.receivedChats);
  const setActiveChats = dashStore((state) => state.setActiveChats);
  const setGivenChats = dashStore((state) => state.setGivenChats);
  const setReceivedChats = dashStore((state) => state.setReceivedChats);

  // useEffect(() => {
  //     axios({
  //       url: '/active',
  //       method: 'GET',
  //     })
  //       .then((data) => {
  //         setActiveChats(data.data);
  //       })
  //       .then(() => {
  //         axios({
  //               url: '/given',
  //               method: 'GET',
  //             })
  //               .then((data) => {
  //                 setGivenChats(data.data);
  //               })
  //               .catch((err) => {
  //                 throw err;
  //               })
  //       })
  //       .then(() => {
  //         axios({
  //               url: '/received',
  //               method: 'GET',
  //             })
  //               .then((data) => {
  //                 setReceivedChats(data.data);
  //               })
  //               .then(() => {
  //                 console.log('ALL POST SAVED IN STORE!')
  //               })
  //               .catch((err) => {
  //                 throw err;
  //               })
  //       })
  //       .catch((err) => {
  //         throw err;
  //       })
  // }, [])



  return (
    <div className="dash-all-posts">
      <div className="dash-post-tabs">
        <Button color="orange" radius="md" size="sx" onClick={() => console.log('hi from active')}>Active</Button>
        <Button color="orange" radius="md" size="sx" onClick={() => console.log('hi from Given')}>Given</Button>
        <Button color="orange" radius="md" size="sx" onClick={() => console.log('hi from Received')}>Received</Button>
      </div>
      <div className="dash-post-box">
        <NewPostButton />
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