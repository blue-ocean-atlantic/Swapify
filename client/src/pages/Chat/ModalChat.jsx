import React from 'react';
import {
  Box,
  Avatar,
  Card,
  Text,
  Modal,
  Title
} from '@mantine/core';
import Chat from './Chat.jsx'

const ModalChat = ({ toUser }) => {
  return (
    <Box>
      <Title order={3} sx={{ textAlign: 'center' }}></Title>
      <Chat toUser={toUser} />
    </Box>
  )
}

export default ModalChat;