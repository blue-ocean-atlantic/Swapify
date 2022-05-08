import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import './NavBar.scss';

const hover = (theme) => ({
  '&:hover': {
    backgroundColor: theme.colors.blue[0],
  },
});

function NavBar({ loggedIn = false }) {
  return (
    <>
      <div className="navbar">
        <Text color="dark" component={Link} id="nav-logo" to="/">
          BARTR
        </Text>

        {loggedIn ? (
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
        ) : (
          <div></div>
        )}

        <div className="nav-actions-container">
          {loggedIn ? (
            <Button
              variant="light"
              color="red"
              radius="xl"
              component={Link}
              to="/"
              rightIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
              onClick={() => {
                console.log('perform logout action now');
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button radius="xl" component={Link} to="/signup">
                Sign up
              </Button>
              <Button variant="subtle" radius="xl" component={Link} to="/login">
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
