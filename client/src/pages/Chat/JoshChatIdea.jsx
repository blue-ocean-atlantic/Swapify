import React from 'react';
import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Grid,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import {
  faAngleLeft,
  faChevronRight,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { data, chats } from './dummy';

function JoshChatIdea(props) {
  const navigate = useNavigate();

  return (
    <div>
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
            <Stack>
              {chats.map((chat) => (
                <Button variant="subtle" size="xl" radius="lg">
                  <Group>
                    <Avatar radius="xl" src={chat.avatar} />
                    <Text>{chat.name}</Text>
                    <FontAwesomeIcon size="xs" icon={faChevronRight} />
                  </Group>
                </Button>
              ))}
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={5}>
          <Container
            style={{
              height: '80vh',
              // width: '65%',
              backgroundColor: '#fff',
              borderRadius: 15,
            }}
          >
            <Title p={15}>Message</Title>
            <Group
              grow
              position="apart"
              direction="column"
              style={{
                // border: '1px solid black',
                height: '85%',
                backgroundColor: '#fff',
                // borderRadius: 15,
              }}
            >
              <Stack justify="flex-end" style={{ height: '100%', padding: 15 }}>
                {data.map((message) => {
                  console.log(message);
                  return (
                    <Group>
                      <Avatar radius="xl" src={message.avatar_url} />
                      <p>{message.message}</p>
                    </Group>
                  );
                })}
                {/* <Group grow> */}
                <TextInput
                  radius="xl"
                  placeholder="Message"
                  rightSection={
                    <ActionIcon color="blue" radius="xl">
                      <FontAwesomeIcon size="lg" icon={faCircleArrowUp} />
                    </ActionIcon>
                  }
                />
                {/* </Group> */}
              </Stack>
            </Group>
          </Container>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default JoshChatIdea;
