import React, { useState } from 'react';
import {
  Button,
  Center,
  Container,
  SegmentedControl,
  Space,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import NavBar from '../../components/NavBar/NavBar.jsx';

const schema = z.object({
  title: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  description: z.string().min(10, {
    message: 'Please give a longer description (at least 10 characters)',
  }),
});

function NewListing() {
  const [type, setType] = useState('swap');
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      available_date: new Date(),
    },
    schema: zodResolver(schema),
  });

  return (
    <>
      <NavBar />
      <Space h="lg" />
      <Container
        radius="xl"
        p={30}
        style={{ backgroundColor: 'white', borderRadius: 15 }}
      >
        <Title order={1}>New Listing</Title>
        <Center>
          <SegmentedControl
            value={type}
            onChange={setType}
            radius="xl"
            size="lg"
            data={[
              { label: 'Swap', value: 'swap' },
              { label: 'Favor', value: 'favor' },
            ]}
          />
        </Center>
        <Stack align="center">
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values);
            })}
          >
            <TextInput
              size="lg"
              label="Title"
              placeholder="My cool item"
              {...form.getInputProps('title')}
            />
            <TextInput
              size="lg"
              label="Description"
              placeholder="This item is cool"
              {...form.getInputProps('description')}
            />
            <DatePicker
              size="lg"
              label="Available date"
              placeholder="Pick date"
              firstDayOfWeek="sunday"
              {...form.getInputProps('available_date')}
            />
            <TextInput
              size="lg"
              label="Set up image upload here"
              placeholder="imagekit.io"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Stack>
      </Container>
    </>
  );
}

export default NewListing;

// const request = '/api/listings'; // POST
// // Should an authorization header be sent as well to make sure a listing can
// // be made only when a user is logged in? (i.e. nobody can create a listing
// // using only someone's ID/username)
// const body = {
//   user_id: String,
//   title: String,
//   description: String,
//   type: String, // swap or trade
//   images: [String, String], // should be imagekit.io urls, I'll figure out how to get that functionality to work
//   avaiable_date: String, // timecode -- backend team can decide what format exactly
//   created_date: String, // timecode -- maybe this is better generated on the backend? i.e. I wouldn't send it, you'd generate it upon DB write
// };
