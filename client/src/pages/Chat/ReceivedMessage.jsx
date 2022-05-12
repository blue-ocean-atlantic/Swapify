import React from 'react';
import {
  ActionIcon,
  Avatar,
  Container,
  Group,
  Stack,
  TextInput,
  Title,
  Box,
  ScrollArea,
  Badge,
  Card,
  Text
} from '@mantine/core';

const ReceivedMessage = ({ createAt, message }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', paddingLeft: '6px' }}><span style={{ fontSize: '10px' }}>{createAt}</span></Box>

      <Group sx={{ padding: '4px', display: 'flex', alignItems: 'start' }}>
        <Avatar size={32}
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