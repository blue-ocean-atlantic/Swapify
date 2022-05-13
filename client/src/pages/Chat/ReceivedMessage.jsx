import React from 'react';
import {
  Avatar,
  Group,
  Box,
  Card,
  Text
} from '@mantine/core';

const ReceivedMessage = ({ createAt, message, toUserProfile }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', paddingLeft: '6px' }}><span style={{ fontSize: '10px' }}>{createAt}</span></Box>

      <Group sx={{ padding: '4px', display: 'flex', alignItems: 'start' }}>
        <Avatar src={toUserProfile} size={32}
        />
        <Card
          shadow="sm"
          style={{ backgroundColor: '#b3e5fc', padding: '5px 10px 5px 10px', maxWidth: '50%' }}
        >
          <Text >
            {message}
          </Text>
        </Card>
      </Group>
    </Box>
  )
}

export default ReceivedMessage;