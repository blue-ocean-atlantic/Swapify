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
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

import './NavBar.scss';
import { data } from './dummy';

const hover = (theme) => ({
  '&:hover': {
    backgroundColor: theme.colors.blue[0],
  },
});

function NavBar(/*{loggedIn = false}*/ { disableSearch = false }) {
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
          {!disableSearch && (
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
          )}
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
