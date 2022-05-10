import React, { useState, useEffect } from 'react';
import socket from './socket.js'
import { Input, Button, Box, Avatar } from '@mantine/core';


const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weekday: 'short',
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
    <div style={{ marginLeft: '20px' }}>
      <div>
        <form onSubmit={e => onLogin(e)}>
          <input type='text' onChange={e => setUserName(e.target.value)} />
          <button type='submit'>Login</button>
        </form>
        <div>
          {
            messageList.map(({ createAt, message, userName }) => (
              <div key={createAt}>
                {userName} {formatDate(createAt)} {message}
              </div>
            ))
          }
        </div>
      </div>
      <form style={{ paddingRight: '10%' }} onSubmit={e => onMessageSubmit(e)}>
        <Input
          type='text'
          onChange={e => setMessage(e.target.value)}
        />
        <Button
          type='submit'
        >submit
        </Button>
      </form>
    </div>)
}

export default Chat;
