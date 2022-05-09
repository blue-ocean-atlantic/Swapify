import React, { useState } from 'react';
import {
  Button,
  Center,
  Container,
  SegmentedControl,
  Space,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { z } from 'zod';

import NavBar from '../../components/NavBar/NavBar.jsx';
import { DropzoneChildren } from './DropzoneChildren/DropzoneChildren.jsx';

const schema = z.object({
  title: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  description: z.string().min(10, {
    message: 'Please give a longer description (at least 10 characters)',
  }),
});

const dropzoneChildren = () => {};

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
        <Container style={{ width: '70%' }}>
          <form
            onSubmit={form.onSubmit((values) => {
              console.log('Submitted!', values);
            })}
          >
            <TextInput
              size="lg"
              label="Title"
              placeholder="My cool item"
              {...form.getInputProps('title')}
            />
            <Textarea
              size="lg"
              label="Description"
              placeholder="This item is cool"
              autosize
              minRows={2}
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
            <Dropzone>{() => DropzoneChildren()}</Dropzone>
            <Button type="submit">Submit</Button>
          </form>
        </Container>
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
