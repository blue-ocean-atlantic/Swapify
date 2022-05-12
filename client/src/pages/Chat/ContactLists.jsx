import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Indicator,
  Text,
  Button,
  Stack,
  Group
} from '@mantine/core';

import { getUserLists, addNewToUser } from './getChatInfo.js'

import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ownerProfileStore from '../../store.js';

// grab all the userName in database that has send message to the user or be sent message from the user
//const userNames = ['qiqi', 'eric', 'wendy']


const ContactLists = ({ pendingUserMessages, onContactClick, loginUser }) => {
  const [activeChatUserName, setActiveChatUserName] = useState()
  const [userNames, setUserNames] = useState([])

  const ownerProfileInfo = ownerProfileStore(state => state.ownerProfile);

  //fake login user
  const user1 = ownerProfileStore(state => state.user1)

  const handleContactClick = (userName) => {
    setActiveChatUserName(userName)
    onContactClick(userName)
  }

  useEffect(() => {
    getUserLists(loginUser)
      .then(({ data }) => {
        let chatLists = data.map(x => x.toUser).concat(data.map(x => x.fromUser))
        chatLists = [...new Set(chatLists)].filter(x => x !== loginUser)
        if (ownerProfileInfo.toUserName && !chatLists.includes(ownerProfileInfo.toUserName)) {
          chatLists.unshift(ownerProfileInfo.toUserName)
        }
        setUserNames(chatLists)
      })
  }, [loginUser, ownerProfileInfo.toUserName])

  return (
    <Stack sx={{ alignItems: 'start' }}>
      {
        userNames.map((userName) => {
          const pendingCount = pendingUserMessages[userName] || 0
          return (
            <Box key={userName} sx={userName === activeChatUserName ? { backgroundColor: '#eceff1', width: '100%', borderRadius: '10px' } : {}}>
              <Button variant="subtle" size="xl" radius="lg" onClick={() => handleContactClick(userName)}>
                <Group>
                  <Indicator inline label={pendingCount} size={16} disabled={!pendingCount}>
                    <Avatar radius="xl" />
                  </Indicator>
                  <Text>{userName}</Text>
                  <FontAwesomeIcon size="xs" icon={faChevronRight} />
                </Group>
              </Button>
            </Box>
          )
        })
      }
    </Stack>
  )
}

export default ContactLists;
