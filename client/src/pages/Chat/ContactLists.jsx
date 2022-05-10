import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Card,
  Text,
  Modal
} from '@mantine/core';

import ModalChat from './ModalChat.jsx';
import { getUserLists } from './getChatInfo.js'

// grab all the userName in database that has send message to the user or be sent message from the user
const userNames = ['qiqi', 'eric', 'wendy']


const ContactLists = () => {
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState(null)
  const onUsernameClicked = (userName) => {
    setOpened(true)
    setUser(userName)
  }

  useEffect(() => {
    getUserLists(userNames[0])
      .then(({ data }) => {
        let chatLists = data.map(x => x.toUser).concat(data.map(x => x.fromUser))
        chatLists = [...new Set(chatLists)].filter(x => x !== userNames[0])
        //console.log(chatLists)
        // this is the chat lists of users
      })
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '30%', marginTop: '10%' }}>
        <Text sx={{ fontWeight: 'bold', textAlign: 'center' }}>Chat Lists</Text>
        {
          userNames.map(x => {
            return (
              <Box key={x} onClick={() => onUsernameClicked(x)} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar radius='xl' />
                <Text>{x}</Text>
              </Box>
            )
          })
        }

      </Card>
      <Modal
        overflow="inside"
        size='md'
        opened={opened}
        onClose={() => setOpened(false)}
        title={'send to ' + user}
        style={{
          title: { color: 'gray' }
        }}
      >
        <Box sx={{ height: '300px' }}>
          <ModalChat toUser={user} />
        </Box>
      </Modal>
    </Box >
  )

}

export default ContactLists;