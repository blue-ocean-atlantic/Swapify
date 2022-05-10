import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import chats from './dashDummy.js';

import { getUnreadNumber } from './models.js';

import dashStore from './dashStore.js';

import { Button } from '@mantine/core';

function ChatButton() {

  // const allChats = dashStore((state) => state.allChats);
  // let unreadChats = null;

  // on page load: grab chat data for specific user

  // useEffect(() => {
  //   axios({
  //     url: '/conversations',
  //     method: 'GET',
  //   })
  //     .then((data) => {
  //       getUnreadNumber(data)
  //     })
  //     .catch((err) => {
  //       console.log('ERROR! couldn"t get user chat data from DB because :', err);
  //     })
  // });

  return (
    <Button color="orange" radius="md" size="md" component={Link}
      to="/chat">
      CHATS! ({getUnreadNumber(chats.chats)} unread)
    </Button>
  );
}

export default ChatButton;

// on page load: renders a button to show unread chats
// onClick: takes you to chats page or shows you a list of chats to checkout