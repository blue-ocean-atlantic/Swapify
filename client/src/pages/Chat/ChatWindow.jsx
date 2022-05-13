import React, { useState, useEffect } from 'react';
// import { Input, Button, Box, Avatar } from '@mantine/core';
// import { getChatInfo } from './getChatInfo.js'
import {
  ActionIcon,
  Avatar,
  Container,
  Group,
  Stack,
  TextInput,
  Box,
  ScrollArea,
} from '@mantine/core';
import {
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReceivedMessage from './ReceivedMessage.jsx'
import SentMessage from './SentMessage.jsx';

const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  weekday: 'short'
})

const formatDate = (dateStr) => {
  return dateTimeFormat.format(new Date(dateStr))
}

function ChatWindow({ messageList, onMessageSubmit, toUserName, toUserProfile, loginUserProfile }) {

  const [message, setMessage] = useState('')
  // const [messageList, setMessageList] = useState([])

  // useEffect(() => {
  //   socket.on('success', (data) => {
  //     console.log(data)
  //   })

  //   socket.on('receiveMessage', ({ createAt, message, userName }) => {
  //     setMessageList(prevList => prevList.concat({ createAt, message, userName }))
  //   })

  //   socket.on('quit', (data) => {
  //     console.log(data)
  //   })

  //   socket.on('login', (data) => {
  //     console.log(data)
  //   })
  // }, [])

  // useEffect(() => {
  //   setMessage(null)
  //   setMessageList([])

  //   getChatInfo(userName, toUserName)
  //     .then(({ data }) => {
  //       data = data.map(x => { x.userName = x.fromUser; return x })
  //       setMessageList(prevList => prevList.concat(data));
  //     })
  // }, [toUserName])

  // const onMessageSubmit = (e) => {
  //   e.preventDefault();
  //   if (userName && toUserName) {
  //     const createAt = new Date()
  //     setMessageList(prevList => prevList.concat({ createAt, message, userName }))
  //     socket.emit('sendMessage', { message, toUserName, createAt, userName })
  //   } else {
  //     alert('must login first and select a user to chat')
  //     console.log('userName=', userName, 'toUserName=', toUserName)
  //   }
  // }

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    onMessageSubmit(message);
    setMessage('')

  }

  // const avatar = (
  //   <Avatar
  //     alt="Avatar for badge"
  //     size={32}
  //     mr={5}
  //     src="image-link"
  //   />
  // );


  return (
    <Container
      style={{
        height: '80vh',
        backgroundColor: '#fff',
        borderRadius: 15,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '8px' }}>
        {
          toUserName &&
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <Avatar src={toUserProfile} radius="xl" size={50} />
            <Box sx={{ fontSize: '15px' }}>{toUserName}</Box>
          </Box>
        }
      </Box>
      <Group
        grow
        position="apart"
        direction="column"
        style={{
          height: '85%',
          backgroundColor: '#fff',
        }}
      >
        <Stack justify="flex-end" style={{ height: '100%', padding: 15 }}>
          <ScrollArea>
            {
              messageList.map(({ createAt, message, userName }) =>
              // <Box key={createAt}>
              //   <Box sx={{ display: 'flex', paddingLeft: '6px' }}><span style={{ fontSize: '10px' }}>{formatDate(createAt)}</span></Box>

              //   <Group sx={{ padding: '4px', display: 'flex', alignItems: 'start' }}>
              //     <Avatar size={32}
              //     />
              //     <Card
              //       shadow="sm"
              //       style={{ backgroundColor: '#E4F4FD', padding: '5px 10px 5px 10px', maxWidth: '40%' }}
              //     >
              //       <Text >
              //         {message}
              //       </Text>
              //     </Card>
              //   </Group>
              // </Box>
              (userName === toUserName ?
                <ReceivedMessage toUserProfile={toUserProfile} createAt={formatDate(createAt)} message={message} key={createAt} />
                : <SentMessage loginUserProfile={loginUserProfile} createAt={formatDate(createAt)} message={message} key={createAt} />)


              )
            }
          </ScrollArea>
          <form onSubmit={e => handleMessageSubmit(e)} >
            <TextInput
              onChange={e => setMessage(e.target.value)}
              value={message}
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

export default ChatWindow;

