import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Group,
  Space,
  Text,
  TextInput,
  Avatar,
  Menu,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useToggle } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faMagnifyingGlass,
  faTableColumns,
  faPlus,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

import './NavBar.scss';
import { data } from './dummy';

const hover = (theme) => ({
  '&:hover': {
    backgroundColor: theme.colors.blue[0],
  },
});

function NavBar(/*{loggedIn = false}*/) {
  const [loggedIn, toggle] = useToggle(true, [true, false]);
  const [query, setQuery] = useInputState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${query.toLowerCase()}`);
  };

  return (
    <>
      <div className="navbar">
        <Group noWrap style={{ width: '50%' }}>
          <Text color="dark" component={Link} id="nav-logo" to="/">
            LOGO
          </Text>
          <TextInput
            size="md"
            placeholder="Search for swaps or favors"
            radius="xl"
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            value={query}
            onChange={setQuery}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                handleSearch();
              }
            }}
            style={{ width: '60%', minWidth: 225 }}
          />
        </Group>
        {/*
        {loggedIn ? (
          <>
            <div className="nav-menu-container">
              <Button
                color="dark"
                variant="subtle"
                radius="md"
                size="lg"
                compact
                uppercase
                component={Link}
                to="/dashboard"
                sx={hover}
              >
                Dashboard
              </Button>
              <Button
                color="dark"
                variant="subtle"
                radius="md"
                size="lg"
                compact
                uppercase
                component={Link}
                to="/new"
                sx={hover}
              >
                New Listing
              </Button>
              <Button
                color="dark"
                variant="subtle"
                radius="md"
                size="lg"
                compact
                uppercase
                component={Link}
                to="/chat"
                sx={hover}
              >
                Chats
              </Button>
            </div>
            <div className="nav-actions-container">
              <Button
                variant="light"
                color="red"
                radius="xl"
                component={Link}
                to="/"
                rightIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                onClick={() => {
                  console.log('perform logout action now');
                  toggle();
                }}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <div></div>
        )} */}

        <div className="nav-menu">
          {loggedIn ? (
            <>
              <Menu
                control={
                  <Button
                    size="lg"
                    // style={{ padding: 10 }}
                    variant="white"
                    color="dark"
                    rightIcon={
                      <Avatar
                        src={data.user.avatar}
                        alt="profile avatar"
                        radius="xl"
                      />
                    }
                  >
                    {data.user.firstName}
                  </Button>
                }
              >
                <Menu.Label>Menu</Menu.Label>
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
                // component={Link}
                // to="/login"
                onClick={() => {
                  toggle();
                }}
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
