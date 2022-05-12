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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useInputState } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import NavBar from '../../components/NavBar/NavBar.jsx';
import ListingCard from './ListingCard/ListingCard.jsx';
import { data } from './dummy';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import axios from 'axios';
// console.log('🚀 ~ data', data);

function Home() {
  const [query, setQuery] = useInputState('');
  const navigate = useNavigate();
  const [zip, setZip] = useState();

  // const handleSearch = () => {
  //   navigate(`/results?query=${query.toLowerCase()}`);
  // };

  useEffect(() => {
    const getZip = async () => {
      const ipResults = await axios.get('https://ipapi.co/json');
      console.log('🚀 ~ getZip ~ ipResults', ipResults.data.postal);
      setZip(ipResults.data.postal);
    };
    getZip();
  }, []);

  const form = useForm({
    initialValues: {
      query: '',
      zipcode: '',
    },
  });

  const handleSearch = ({ query, zipcode }) => {
    zipcode = zipcode || zip;
    console.log('🚀 ~ handleSearch ~ zipcode', zipcode);
    navigate(`/results?query=${query.toLowerCase()}&zipcode=${zipcode}`);
  };

  return (
    <>
      <NavBar />
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
          <Container style={{ position: 'relative', width: '70%' }}>
            <Box sx={{ maxWidth: 350 }} mx="auto">
              <form onSubmit={form.onSubmit((values) => handleSearch(values))}>
                <TextInput
                  required
                  placeholder="What are you looking for?"
                  {...form.getInputProps('query')}
                />
                <TextInput
                  autoComplete="nope"
                  placeholder="Zip code"
                  {...form.getInputProps('zipcode')}
                />
                <Button fullWidth type="submit">
                  Submit
                </Button>
              </form>
            </Box>
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
