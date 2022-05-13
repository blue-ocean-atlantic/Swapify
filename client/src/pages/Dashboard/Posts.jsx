import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NewPostButton from './NewPostButton.jsx';
import ActivePosts from './ActivePosts.jsx';
import GivenPosts from './GivenPosts.jsx';
import ReceivedPosts from './ReceivedPosts.jsx';
import Tabs from './Tabs.jsx';

import { active, given, received } from './dashDummy.js'
import dashStore from './dashStore.js';

import './Posts.scss';
import { Button } from '@mantine/core';

function Posts() {

  const activePosts = dashStore((state) => state.activePosts);
  const givenPosts = dashStore((state) => state.givenPosts);
  const receivedPosts = dashStore((state) => state.receivedPosts);

  const setActivePosts = dashStore((state) => state.setActivePosts);
  const setGivenPosts = dashStore((state) => state.setGivenPosts);
  const setReceivedPosts = dashStore((state) => state.setReceivedPosts);

  const active = dashStore((state) => state.active);
  const given = dashStore((state) => state.given);
  const received = dashStore((state) => state.received);

  useEffect(() => {
    axios({
      url: 'http://localhost:3005/api/listings/active?donor_id=90',
      method: 'GET',
    })
      .then((data) => {
        console.log(data.data)
        setActivePosts(data.data);
      })
      .then(() => {
        axios({
          url: 'http://localhost:3005/api/listings/completed?donor_id=3',
          method: 'GET',
        })
          .then((data) => {
            console.log(data.data)
            setGivenPosts(data.data);
          })
          .catch((err) => {
            throw err;
          })
      })
      .then(() => {
        axios({
          url: 'http://localhost:3005/api/listings/received?receiver_id=27',
          method: 'GET',
        })
          .then((data) => {
            console.log(data.data);
            setReceivedPosts(data.data);
          })
          .then(() => {
            console.log('ALL POST SAVED IN STORE!')
          })
          .catch((err) => {
            throw err;
          })
      })
      .catch((err) => {
        throw err;
      })
  }, [])

  if (active) {

    return (
      <div className="dash-all-posts">
        <div className="dash-post-tabs">
          <Tabs />
        </div>
        <div className="dash-post-box">
          <NewPostButton />
          <ActivePosts />
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
          <GivenPosts />
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
          <ReceivedPosts />
        </div>
      </div>
    )
  }
}

export default Posts;