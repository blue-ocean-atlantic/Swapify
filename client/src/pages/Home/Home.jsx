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
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
// console.log('🚀 ~ data', data);

function Home() {
  const [query, setQuery] = useInputState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${query.toLowerCase()}`);
  };

  // const data = await axios.get(...)

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
          <Center>
            <Button radius="xl" size="lg" component={Link} to="/signup">
              Create an account
            </Button>
          </Center>
          <SearchBar />
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
