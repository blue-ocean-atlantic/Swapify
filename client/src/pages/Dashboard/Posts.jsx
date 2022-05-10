import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NewPostButton from './NewPostButton.jsx';
import Tabs from './Tabs.jsx';
import dashStore from './dashStore.js';

import './Posts.scss';
import { Button } from '@mantine/core';

function Posts() {
  // get all posts on page load (send all three requests at once)
  // store data in separate in variables in zustand store
  // render posts based on click to tab

  const activeChats = dashStore((state) => state.activeChats);
  const givenChats = dashStore((state) => state.givenChats);
  const receivedChats = dashStore((state) => state.receivedChats);
  const setActiveChats = dashStore((state) => state.setActiveChats);
  const setGivenChats = dashStore((state) => state.setGivenChats);
  const setReceivedChats = dashStore((state) => state.setReceivedChats);
  const active = dashStore((state) => state.active);
  const given = dashStore((state) => state.given);
  const received = dashStore((state) => state.received);

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

  if (active) {
    return (
      <div className="dash-all-posts">
        <div className="dash-post-tabs">
          <Tabs />
        </div>
        <div className="dash-post-box">
          <NewPostButton />
          <ul>
            <li>Act</li>
            <li>Act</li>
            <li>Act</li>
            <li>Act</li>
          </ul>
        </div>
      </div>
    )
  } else if (given) {
    return (
      <div className="dash-all-posts">
        <div className="dash-post-tabs">
          <Tabs />
        </div>
        <div className="dash-post-box">
          <NewPostButton />
          <ul>
            <li>Given</li>
            <li>Given</li>
            <li>Given</li>
            <li>Given</li>
          </ul>
        </div>
      </div>
    )
  } else if (received) {
    return (
      <div className="dash-all-posts">
        <div className="dash-post-tabs">
          <Tabs />
        </div>
        <div className="dash-post-box">
          <NewPostButton />
          <ul>
            <li>Rec</li>
            <li>Rec</li>
            <li>Rec</li>
            <li>Rec</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Posts;