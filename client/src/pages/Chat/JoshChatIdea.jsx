import React, { useRef, useEffect } from 'react';
import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Grid,
  Group,
  ScrollArea,
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
import { DatePicker } from '@mantine/dates';

function JoshChatIdea() {
  const navigate = useNavigate();
  const viewport = useRef();

  useEffect(() => {
    viewport.current.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    });
  });

  return (
    <div>
      <Button
        variant="subtle"
        onClick={() => {
          navigate(-1);
        }}
        leftIcon={<FontAwesomeIcon icon={faAngleLeft} />}
      >
        Back
      </Button>
      <Space h="md" />
      <Grid grow align="flex-start">
        <Grid.Col span={1}>
          <Container
            style={{
              height: '80vh',
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
        <Grid.Col span={6}>
          <Container
            style={{
              height: '80vh',
              // width: '65%',
              backgroundColor: '#fff',
              borderRadius: 15,
            }}
          >
            <Group position="apart">
              <Title p={15}>Message</Title>
              <DatePicker
                placeholder="Click to schedule swap!"
                firstDayOfWeek="sunday"
              />
            </Group>
            <Group
              grow
              position="apart"
              direction="column"
              style={{
                // border: '1px solid black',
                height: '85%',
                maxHeight: '85%',
                // backgroundColor: '#fff',
              }}
            >
              <Stack style={{ height: '100%', padding: 15 }}>
                <ScrollArea viewportRef={viewport}>
                  <Stack
                    justify="flex-end"
                    style={{ height: '100%', padding: 15 }}
                  >
                    {data.map((message) => {
                      console.log(message);
                      return (
                        <Group noWrap align="flex-start">
                          <Avatar radius="xl" src={message.avatar_url} />
                          <Text>{message.message}</Text>
                        </Group>
                      );
                    })}
                  </Stack>
                </ScrollArea>
                <TextInput
                  radius="xl"
                  placeholder="Message"
                  rightSection={
                    <ActionIcon color="blue" radius="xl">
                      <FontAwesomeIcon size="lg" icon={faCircleArrowUp} />
                    </ActionIcon>
                  }
                />
              </Stack>
            </Group>
          </Container>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default JoshChatIdea;
