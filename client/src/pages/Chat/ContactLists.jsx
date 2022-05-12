import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  Indicator,
  Text,
  Modal,
  Button,
  Container,
  Stack,
  Title,
  Group
} from '@mantine/core';

import { getUserLists } from './getChatInfo.js'
import NavBar from '../../components/NavBar/NavBar.jsx';
import BackButton from './BackButton.jsx'

import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { data, chats } from './dummy';

// grab all the userName in database that has send message to the user or be sent message from the user
//const userNames = ['qiqi', 'eric', 'wendy']


const ContactLists = ({ pendingUserMessages, onContactClick, loginUser }) => {
  const [activeChatUserName, setActiveChatUserName] = useState()
  const [userNames, setUserNames] = useState([])

  const handleContactClick = (userName) => {
    setActiveChatUserName(userName)
    onContactClick(userName)
  }

  useEffect(() => {
    getUserLists(loginUser)
      .then(({ data }) => {
        let chatLists = data.map(x => x.toUser).concat(data.map(x => x.fromUser))
        chatLists = [...new Set(chatLists)].filter(x => x !== loginUser)
        setUserNames(chatLists)
      })
  }, [loginUser])

  return (
    <Stack sx={{ alignItems: 'start' }}>
      {
        userNames.map(userName => {
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
