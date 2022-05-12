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

const SentMessage = ({ createAt, message }) => {
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
        />
      </Group>
    </Box>
  )
}

export default SentMessage;