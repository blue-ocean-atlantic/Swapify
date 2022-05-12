import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Group, Space, Text, Avatar, Menu } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faTableColumns,
  faPlus,
  faComments,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

import './NavBar.scss';
import { data } from './dummy';
import SearchBar from '../SearchBar/SearchBar.jsx';

function NavBar({ disableSearch = false }) {
  const loggedIn = document.cookie.split('=')[1];
  console.log('🚀 ~ NavBar ~ loggedIn', !!loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const username = document.cookie.split('=')[1];
    const getUser = async () => {
      try {
        const user = await axios.get('/api/users', { username }); // -> { userinfo }
        setUserinfo(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <div className="navbar">
        <Group noWrap align="center" style={{ width: '50%' }}>
          <Text color="dark" component={Link} id="nav-logo" to="/">
            LOGO
          </Text>
          {!disableSearch && <SearchBar variant="nav" />}
        </Group>

        <div className="nav-menu">
          {loggedIn ? (
            <>
              <Menu
                size="xl"
                styles={{
                  root: {
                    zIndex: 10,
                  },
                  label: {
                    fontSize: 18,
                  },
                  item: {
                    fontSize: 18,
                    padding: 20,
                  },
                }}
                control={
                  <Button
                    size="lg"
                    variant="white"
                    color="dark"
                    leftIcon={
                      <Avatar
                        src={data.user.avatar}
                        alt="profile avatar"
                        radius="xl"
                      />
                    }
                    rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                  >
                    {data.user.firstName}
                  </Button>
                }
              >
                {/* <Menu.Label>Menu</Menu.Label> */}
                <Menu.Item
                  component={Link}
                  to="/dashboard"
                  icon={<FontAwesomeIcon icon={faTableColumns} />}
                >
                  Dashboard
                </Menu.Item>
                <Menu.Item
                  component={Link}
                  to="/new"
                  icon={<FontAwesomeIcon icon={faPlus} />}
                >
                  New Listing
                </Menu.Item>
                <Menu.Item
                  component={Link}
                  to="/chat"
                  icon={<FontAwesomeIcon icon={faComments} />}
                >
                  Chats
                </Menu.Item>
                <Menu.Item
                  color="red"
                  // component={Link}
                  // to="/logout"
                  onClick={() => {
                    console.log('Handle Logout');
                  }}
                  icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </>
          ) : (
            <>
              <Button radius="xl" component={Link} to="/signup">
                Sign up
              </Button>
              <Button
                variant="subtle"
                radius="xl"
                component={Link}
                to="/login"
                // onClick={() => {
                //   toggle();
                // }}
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
      <Space h={75} />
    </>
  );
}

export default NavBar;
