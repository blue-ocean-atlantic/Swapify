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
  Checkbox,
  Group,
  Box,
  Select
} from '@mantine/core';
import { useForm } from '@mantine/form';
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
import { v4 as uuidv4 } from 'uuid';

// console.log('🚀 ~ data', data);

function Home() {
  const [query, setQuery] = useInputState('');
  const navigate = useNavigate();

  // const handleSearch = () => {
  //   navigate(`/results?query=${query.toLowerCase()}`);
  // };

  const form = useForm({
    initialValues: {
      query: 'chair',
      zipcode: '78701',
      radius: '5',
    }
  });

  const handleSearch2 = (values) => {
    return navigate(`/results?query=${values.query.toLowerCase()}&zipcode=${values.zipcode}&radius=${values.radius}`);
}

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
          {/* <TextInput
              size="xl"
              placeholder="Search for swaps or favors"
              radius="xl"
              icon={<FontAwesomeIcon size="xl" icon={faMagnifyingGlass} />}
              // style={{ width: '70%', transition: 300 }}
              value={query}
              onChange={setQuery}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  handleSearch();
                }
              }}
            /> */}
          <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={ form.onSubmit((values)=>handleSearch2(values))}>
              <TextInput
                required
                placeholder="What are you looking for?"
                {...form.getInputProps('query')}
              />
              <TextInput
                required
                placeholder="Zip code"
                {...form.getInputProps('zipcode')}
              />
              <Select
                label="Radius"
                placeholder="Pick one"
                data={[
                  { value: '5', label: '5 mi' },
                  { value: '10', label: '10 mi' },
                ]}
              />

              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Box>
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
          <ListingCard key={uuidv4()} listing={listing} />
        ))}
        {data.results.map((listing) => (
          <ListingCard key={uuidv4()} listing={listing} />
        ))}
      </SimpleGrid>
    </main>
  </>
);
}

export default Home;
