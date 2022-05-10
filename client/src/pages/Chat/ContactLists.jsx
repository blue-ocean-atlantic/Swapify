import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Card,
  Text,
  Modal,
  Button,
  Container,
  Stack,
  Title,
  Group
} from '@mantine/core';

import ModalChat from './ModalChat.jsx';
import { getUserLists } from './getChatInfo.js'
import JoshChatIdea from './JoshChatIdea.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';
import BackButton from './BackButton.jsx'

import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { data, chats } from './dummy';

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
    <>
      <NavBar />
      <main>
        <BackButton />
        <Container
          style={{
            height: '80vh',
            width: '50%',
            backgroundColor: '#fff',
            borderRadius: 15,
          }}
        >
          <Title p={15}>Chats</Title>
          <Stack>
            {
              userNames.map(x => {
                return (
                  <Button key={x} variant="subtle" size="xl" radius="lg" onClick={() => onUsernameClicked(x)}>
                    <Group>
                      <Avatar radius="xl" />
                      <Text>{x}</Text>
                      <FontAwesomeIcon size="xs" icon={faChevronRight} />
                    </Group>
                  </Button>
                )
              })
            }
          </Stack>
        </Container>
        <Modal
          overflow="inside"
          size='xl'
          opened={opened}
          onClose={() => setOpened(false)}
          title={'send to ' + user}
          style={{
            title: { color: 'gray' }
          }}
        >
          <Box sx={{ height: '500px' }}>
            <ModalChat toUser={user} />
          </Box>
        </Modal>


      </main>
    </>
  )

}

export default ContactLists;
