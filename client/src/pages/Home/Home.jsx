import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import axios from 'axios';
import {
  Button,
  Stack,
  Center,
  Space,
  SimpleGrid,
  Title,
  Divider,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';

import NavBar from '../../components/NavBar/NavBar.jsx';
import ListingCard from './ListingCard/ListingCard.jsx';
import { data } from './dummy';
// import axios from 'axios';
// console.log('🚀 ~ data', data);

function Home() {
  const loggedIn = document.cookie.split('=')[1]; // username=josh  "" -> undefined

  const navigate = useNavigate();
  const [listings, setListings] = useInputState([]);
  const [zip, setZip] = useState();

  useEffect(() => {
    const getZip = async () => {
      const ipResults = await axios.get('https://ipapi.co/json');
      setZip(ipResults.data.postal);
    };
    getZip();

    const id = document.cookie.split('=')[1]; // = ''

    // API GET for listings data (currently dummy data)

    const getListings = async () => {
      try {
        const listings = await axios.get(
          'http://localhost:3005/api/listings/landing'
        );
        console.log('🚀 ~ getListings ~ listings', listings);

        setListings(listings.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListings();
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
          {!loggedIn && (
            <Center>
              <Button radius="xl" size="lg" component={Link} to="/signup">
                Create an account
              </Button>
            </Center>
          )}
          <SearchBar />
        </Stack>
        <Divider my={50} label="LISTINGS NEAR YOU" labelPosition="center" />
        <SimpleGrid cols={4} spacing="xl">
          {listings.map((listing) => (
            <ListingCard key={uuid()} listing={listing} />
          ))}
        </SimpleGrid>
      </main>
    </>
  );
}

export default Home;
