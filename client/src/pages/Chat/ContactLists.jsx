import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Indicator,
  Text,
  Button,
  Stack,
  Group,
} from '@mantine/core';

import { getUserLists, addNewToUser, getUserProfiles } from './getChatInfo.js';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ownerProfileStore from '../../store.js';

// grab all the userName in database that has send message to the user or be sent message from the user
//const userNames = ['qiqi', 'eric', 'wendy']

const ContactLists = ({
  pendingUserMessages,
  onContactClick,
  loginUser,
  handleUserProfile,
}) => {
  const [activeChatUserName, setActiveChatUserName] = useState();
  const [userNames, setUserNames] = useState([]);
  const [userInfos, setUserInfos] = useState([]);

  const ownerProfileInfo = ownerProfileStore((state) => state.ownerProfile);

  const handleContactClick = (userName) => {
    setActiveChatUserName(userName);
    onContactClick(userName);
    handleUserProfile(
      userInfos.filter((x) => x.userName === userName)[0]
        ? userInfos.filter((x) => x.userName === userName)[0].profile
        : ''
    );
  };

  useEffect(() => {
    addNewToUser(ownerProfileInfo.toUserName, ownerProfileInfo.toUserProfile);
  }, [ownerProfileInfo.toUserName, ownerProfileInfo.toUserProfile]);

  useEffect(() => {
    getUserProfiles(userNames).then(({ data }) => setUserInfos(data));
  }, [userNames]);

  useEffect(() => {
    getUserLists(loginUser).then(({ data }) => {
      let chatLists = data
        .map((x) => x.toUser)
        .concat(data.map((x) => x.fromUser));
      chatLists = [...new Set(chatLists)].filter((x) => x !== loginUser);
      if (
        ownerProfileInfo.toUserName &&
        !chatLists.includes(ownerProfileInfo.toUserName)
      ) {
        chatLists.unshift(ownerProfileInfo.toUserName);
      }
      setUserNames(chatLists);
    });
  }, [loginUser, ownerProfileInfo.toUserName]);

  return (
    <Stack sx={{ alignItems: 'start' }}>
      {userNames.map((userName) => {
        const pendingCount = pendingUserMessages[userName] || 0;
        return (
          <Box
            key={userName}
            sx={
              userName === activeChatUserName
                ? {
                    backgroundColor: '#eceff1',
                    width: '100%',
                    borderRadius: '10px',
                  }
                : {}
            }
          >
            <Button
              // fullWidth
              variant="subtle"
              size="xl"
              radius="lg"
              onClick={() => handleContactClick(userName)}
            >
              <Group>
                <Indicator
                  inline
                  label={pendingCount}
                  size={16}
                  disabled={!pendingCount}
                >
                  <Avatar
                    src={
                      userInfos.filter((x) => x.userName === userName)[0]
                        ? userInfos.filter((x) => x.userName === userName)[0]
                            .profile
                        : ''
                    }
                    radius="xl"
                  />
                </Indicator>
                <Text>{userName}</Text>
                <FontAwesomeIcon size="xs" icon={faChevronRight} />
              </Group>
            </Button>
          </Box>
        );
      })}
    </Stack>
  );
};

export default ContactLists;
