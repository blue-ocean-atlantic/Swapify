import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Stack,
  TextInput,
  ActionIcon,
  Center,
  Space,
  Transition,
  Container,
  SimpleGrid,
  Title,
  Divider,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-uuid';

import NavBar from '../../components/NavBar/NavBar.jsx';
import ListingCard from './ListingCard/ListingCard.jsx';
import { data } from './dummy';
import axios from 'axios';
// console.log('🚀 ~ data', data);

function Home() {
  const [query, setQuery] = useInputState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('/logout').then(navigate('/'));
  }

  const isLoggedIn = document.cookie;
  console.log('isLoggedIn', isLoggedIn);

  const handleSearch = () => {
    navigate(`/results?query=${query.toLowerCase()}`);
  };

  return (
    <>
      <NavBar disableSearch />
      <main>
        <Space h="xl" />
        <Title order={1} align="center">
          No money. Just people.
        </Title>
        <Space h={50} />
        <Stack spacing={50}>
          <div>
            {isLoggedIn
              ?
              <Center>
                <Button radius="xl" size="lg" onClick={() => handleLogout()} >
                  LogOut
                </Button>
              </Center>

              : <Center><Button radius="xl" size="lg" component={Link} to="/signup" onClick={() => checkLoginStatus()} >
                Create an account
              </Button>
                <Button radius="xl" size="lg" component={Link} to="/login">
                  Login
                </Button></Center>
            }
          </div>

          <Container style={{ position: 'relative', width: '70%' }}>
            <TextInput
              size="xl"
              placeholder="Search for swaps or favors"
              radius="xl"
              icon={<FontAwesomeIcon size="xl" icon={faMagnifyingGlass} />}
              value={query}
              onChange={setQuery}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Transition
              mounted={query.length > 0}
              transition="slide-right"
              duration={200}
              timingFunction="ease"
            >
              {(styles) => (
                <ActionIcon
                  variant="transparent"
                  style={{
                    ...styles,
                    position: 'absolute',
                    right: 35,
                    top: 16,
                  }}
                  onClick={handleSearch}
                  color="blue"
                >
                  <FontAwesomeIcon size="xl" icon={faArrowRight} />
                </ActionIcon>
              )}
            </Transition>
          </Container>
        </Stack>
        <Divider my={50} label="LISTINGS NEAR YOU" labelPosition="center" />
        <SimpleGrid cols={4} spacing="xl">
          {data.results.map((listing) => (
            <ListingCard key={uuid()} listing={listing} />
          ))}
          {data.results.map((listing) => (
            <ListingCard key={uuid()} listing={listing} />
          ))}
        </SimpleGrid>
      </main>
    </>
  );
}

export default Home;
