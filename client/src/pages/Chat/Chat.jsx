import React, { useState, useEffect, useRef } from 'react';
import socket from './socket.js'
// import { io } from 'socket.io-client';
import { getChatInfo, addNewToUser } from './getChatInfo.js'
import {
  Box,
  Button,
  Container,
  Grid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import {
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar.jsx';
import ContactLists from './ContactLists.jsx'
import ChatWindow from './ChatWindow.jsx';
import ownerProfileStore from '../../store.js';
import axios from 'axios'



function Chat(props) {
  const navigate = useNavigate();


  const [loginUserProfile, setloginUserProfile] = useState();
  const userName = document.cookie.split('=')[1]

  useEffect(() => {
    axios.get(`http://localhost:3005/api/username?username=${userName}`)
      .then((user) => {
        if (user.data[0] === undefined) {
          user.data[0] = { first_name: '', last_name: '', email: '', user_id: 0 }
        }
        //console.log('user info', user.data[0].photo_url)
        setloginUserProfile(user.data[0].photo_url)
        //console.log('addNewToUser', userName)
        addNewToUser(userName, user.data[0].photo_url)
      })
  }, []);

  const [toUserName, setToUserName] = useState()
  const [messageList, setMessageList] = useState([])
  const [pendingUserMessages, setPendingUserMessages] = useState({})
  const [toUserProfile, setToUserProfile] = useState()


  const toUserNameRef = useRef(toUserName)

  const toUserMessageList = messageList.filter((x) => x.userName === toUserName || x.userName === userName)

  useEffect(() => {
    socket.connect()

    socket.on('success', (data) => {
      console.log(data)
      socket.emit('login', { userId: socket.id, userName: userName, createAt: new Date() })
    })

    socket.on('receiveMessage', (msg) => {
      handleMessageReceive(msg)
    })

    socket.on('quit', (data) => {
      console.log(data)
    })

    socket.on('login', (data) => {
      console.log(data)
    })

    return () => {
      socket.removeAllListeners()
      socket.disconnect()
    }
  }, [userName])

  useEffect(() => {
    getChatInfo(userName, toUserName)
      .then(({ data }) => {
        data = data.map(x => { x.userName = x.fromUser; return x })
        setMessageList(data)
      })
  }, [userName, toUserName])

  const handleMessageReceive = (msg) => {
    const { createAt, message, userName } = msg
    if (userName !== toUserNameRef.current) {
      // console.log('userName=', userName, 'toUserName=', toUserNameRef.current)
      setPendingUserMessages(prevObj => {
        const obj = { ...prevObj }
        obj[userName] = obj[userName] + 1 || 1
        return obj
      })
    }
    setMessageList(prevList => prevList.concat(msg))
  }

  const handleMessageSubmit = (message) => {
    if (userName && toUserName) {
      const createAt = new Date()
      setMessageList(prevList => prevList.concat({ createAt, message, userName }))
      socket.emit('sendMessage', { message, toUserName, createAt, userName })
    } else {
      alert('must login first and select a user to chat')
      console.log('userName=', userName, 'toUserName=', toUserName)
    }
  }

  const handleContactClick = (toUserName) => {
    setPendingUserMessages(prevObj => {
      const obj = { ...prevObj }
      obj[toUserName] = 0
      return obj
    })
    toUserNameRef.current = toUserName
    setToUserName(toUserName)
  }

  const handleUserProfile = (profile) => {
    setToUserProfile(profile)
  }

  // TODO delete this later
  // const handleLoginClick = (e) => {
  //   e.preventDefault();
  //   setUserName(textUserNameInput)
  //   // socket.emit('login', { userId: socket.id, userName: userName, createAt: new Date() })
  // }

  return (
    <>
      <NavBar />
      <main>
        <div>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="subtle"
              onClick={() => {
                navigate(-1);
              }}
              leftIcon={<FontAwesomeIcon icon={faAngleLeft} />}
            >
              Back
            </Button>

            {/* // TODO delete this later */}

            {/* <form onSubmit={e => handleLoginClick(e)}>
              <input type='text' onChange={e => setTextUserNameInput(e.target.value)} />
              <button type='submit'>Login</button>
            </form> */}

            <Text sx={{ marginLeft: '10px' }}>
              Logged in as: {userName}
            </Text>
          </Box>
          <Space h="md" />
          <Grid grow align="flex-start">
            <Grid.Col span={1}>
              <Container
                style={{
                  height: '80vh',
                  // width: '30%',
                  backgroundColor: '#fff',
                  borderRadius: 15,
                }}
              >
                <Title p={15}>Chats</Title>
                <ContactLists
                  onContactClick={handleContactClick}
                  pendingUserMessages={pendingUserMessages}
                  loginUser={userName}
                  handleUserProfile={handleUserProfile}
                />
              </Container>
            </Grid.Col>
            <Grid.Col span={5}>
              <ChatWindow
                messageList={toUserMessageList}
                onMessageSubmit={handleMessageSubmit}
                toUserName={toUserName}
                toUserProfile={toUserProfile}
                loginUserProfile={loginUserProfile}
              />
            </Grid.Col>
          </Grid>
        </div>
      </main>
    </>
  );
}

export default Chat;
