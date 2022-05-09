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
  Group,
  PasswordInput
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import NavBar from '../../components/NavBar/NavBar.jsx';

const schema = z.object({
  firstName: z.string().min(1, { message: 'Name should have at least 1 letter' }),
  lastName: z.string().min(1, { message: 'Name should have at least 1 letter' }),
  zipCode: z.string().min(2, { message: 'Zipcode should consist of 5 numbers' }),
  email: z.string().email({ message: 'Must input a valid email address' }),
  password: z.string().min(5, { message: 'Password should have at least 5 characters' }),
  passwordConfirm: z.string().min(2, { message: 'Password should have at least 5 characters' }),
});

function Signup() {
  const [type, setType] = useState('swap');
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      zipCode: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    schema: zodResolver(schema),
  });

  return (
    <>
      <NavBar />
      <Space h="lg" />
      <Container
        radius="xl"
        p={45}
        style={{ backgroundColor: 'white', borderRadius: 15 }}
      >
        <Title order={1}>Sign-up</Title>
        <Space h="lg" />

        <Stack align="center">
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values);
            })}
          >
            <Group >
              <TextInput
                size="lg"
                label="First Name"
                placeholder="Frank"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                size="lg"
                label="Last Name"
                placeholder="Senatra"
                {...form.getInputProps('lastName')}
              />
            </Group>
            <Space h="lg" />
            <Group>
              <TextInput
                size="lg"
                label="Zip Code"
                placeholder="5-digit zip"
                {...form.getInputProps('zipCode')}
              />
              <TextInput
                size="lg"
                label="Email"
                placeholder="example@example.com"
                {...form.getInputProps('email')}
              />
            </Group>
            <Space h="lg" />

            <PasswordInput
              size="lg"
              label="Password"
              placeholder="myPassword"
              {...form.getInputProps('password')}
            />
            <Space h="lg" />
            <PasswordInput
              size="lg"
              label="Confirm Password"
              placeholder="myPassword again!"
              {...form.getInputProps('passwordConfirm')}
            />
            <Space h="lg" />
            <Button type="submit">Submit</Button>
          </form>
        </Stack>
      </Container>
    </>
  );
}

export default Signup;

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