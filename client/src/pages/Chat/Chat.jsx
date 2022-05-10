import React, { useState, useEffect } from 'react';
import socket from './socket.js'
// import { Input, Button, Box, Avatar } from '@mantine/core';
import { getChatInfo } from './getChatInfo.js'
import {
  ActionIcon,
  Avatar,
  Container,
  Group,
  Stack,
  TextInput,
  Title,
  Box
} from '@mantine/core';
import {
  faAngleLeft,
  faChevronRight,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { data, chats } from './dummy';


const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})

const formatDate = (dateStr) => {
  return dateTimeFormat.format(new Date(dateStr))
}


function Chat({ toUser }) {

  const [message, setMessage] = useState(null)
  const [userName, setUserName] = useState(null)
  const [toUserName, setToUserName] = useState(toUser)
  const [messageList, setMessageList] = useState([])



  useEffect(() => {
    socket.on('success', (data) => {
      console.log(data)
    })
    socket.on('receiveMessage', ({ createAt, message, userName }) => {
      setMessageList(prevList => prevList.concat({ createAt, message, userName }))
    })

    socket.on('quit', (data) => {
      console.log(data)
    })

    socket.on('login', (data) => {
      console.log(data)
    })

    getChatInfo('qiqi', toUserName)
      .then(({ data }) => {
        data = data.map(x => { x.userName = x.fromUser; return x })
        setMessageList(prevList => prevList.concat(data));
      })
  }, [])

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const createAt = new Date()
    setMessageList(prevList => prevList.concat({ createAt, message, userName }))
    socket.emit('sendMessage', { message, toUserName, createAt, userName })
  }

  const onLogin = (e) => {
    e.preventDefault();
    socket.emit('login', { userId: socket.id, userName: userName, createAt: new Date() })
  }

  return (
    <Container
      style={{
        height: '80vh',
        backgroundColor: '#fff',
        borderRadius: 15,
      }}
    >
      <Title p={15}>Message</Title>
      <form onSubmit={e => onLogin(e)}>
        <input type='text' onChange={e => setUserName(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
      <Group
        grow
        position="apart"
        direction="column"
        style={{
          height: '85%',
          backgroundColor: '#fff',
        }}
      >
        <Stack justify="flex-end" style={{ height: '100%', padding: 5 }}>
          {
            messageList.map(({ createAt, message, userName }) => (
              <Group key={createAt}>
                <Avatar radius="xl" />
                <p>{userName} {formatDate(createAt)} {message}</p>
              </Group>
            ))
          }
          <form onSubmit={e => onMessageSubmit(e)} >
            <TextInput
              onChange={e => setMessage(e.target.value)}
              radius="xl"
              placeholder="Message"
              rightSection={
                <ActionIcon type='submit' color="blue" radius="xl">
                  <FontAwesomeIcon size="lg" icon={faCircleArrowUp} />
                </ActionIcon>
              }
            />
          </form>
        </Stack>
      </Group>
    </Container >
  )
}

export default Chat;

