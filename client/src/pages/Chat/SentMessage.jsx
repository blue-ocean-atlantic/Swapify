import React from 'react';
import {
  Avatar,
  Group,
  Box,
  Card,
  Text
} from '@mantine/core';


const SentMessage = ({ createAt, message, loginUserProfile }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', paddingLeft: '6px', justifyContent: "end" }}><span style={{ fontSize: '10px' }}>{createAt}</span></Box>
      <Group sx={{ padding: '4px', display: 'flex', alignItems: 'start', justifyContent: "end" }}>
        <Card
          shadow="sm"
          style={{ backgroundColor: '#dcedc8', padding: '5px 10px 5px 10px', maxWidth: '50%' }}
        >
          <Text >
            {message}
          </Text>
        </Card>
        <Avatar size={32}
          src={loginUserProfile}
        />
      </Group>
    </Box>
  )
}

export default SentMessage;