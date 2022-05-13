import React from 'react';
import {
  Avatar,
  Group,
  Box,
  Card,
  Text
} from '@mantine/core';

import ownerProfileStore from '../../store.js';


const SentMessage = ({ createAt, message }) => {
  const user1 = ownerProfileStore(state => state.user1)
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
          src={user1.profile}
        />
      </Group>
    </Box>
  )
}

export default SentMessage;