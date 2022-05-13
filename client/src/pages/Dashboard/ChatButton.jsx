import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import chats from './dashDummy.js';
import axios from 'axios';
import { getUnreadNumber } from './models.js';

import dashStore from './dashStore.js';
import { Button } from '@mantine/core';

function ChatButton() {

  // DUE TO TIME CONSTARINTS - we were unable to generate the data necessary to dynamically render unread message

  // const allChats = dashStore((state) => state.allChats);
  let unreadChats = 0;

  // on page load: grab chat data for specific user

  // useEffect(() => {
  //   axios({
  //     url: '/conversations',
  //     method: 'GET',
  //   })
  //     .then((data) => {
  //       unreadChats = getUnreadNumber(data.data)
  //     })
  //     .catch((err) => {
  //       console.log('ERROR! couldn"t get user chat data from DB because :', err);
  //     })
  // }, []);

  return (
    <Button color="blue" radius="md" size="md" component={Link}
      to="/chat">
      CHATS!
      {/* ({unreadChats} unread) */}
    </Button>
  );
}

export default ChatButton;
