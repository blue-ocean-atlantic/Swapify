import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
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
  Checkbox,
  Group,
  Box,
  Select,
  ThemeIcon,
  Grid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useInputState } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faMagnifyingGlass,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';

import NavBar from '../../components/NavBar/NavBar.jsx';
import ListingCard from './ListingCard/ListingCard.jsx';
import { data } from './dummy';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import axios from 'axios';
// console.log('🚀 ~ data', data);

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useInputState('');
  const [zip, setZip] = useState();
  const [userinfo, setUserinfo] = useState();
  console.log('🚀 ~ Home ~ userinfo', userinfo);

  useEffect(() => {
    const getZip = async () => {
      const ipResults = await axios.get('https://ipapi.co/json');
      setZip(ipResults.data.postal);
    };
    getZip();

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
