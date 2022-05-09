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
  email: z.string().email({ message: 'Must input a valid email address' }),
  password: z.string().min(5, { message: 'Password should have at least 5 characters' }),
});

function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
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
        <Title order={1}>Login</Title>
        <Center>
          <Space h="lg" />
          <Stack align="center">
            <form
              onSubmit={form.onSubmit((values) => {
                console.log(values);
              })}
            >
              <Space h="lg" />
              <TextInput
                size="lg"
                label="Email"
                placeholder="example@example.com"
                {...form.getInputProps('email')}
              />
              <Space h="lg" />
              <PasswordInput
                size="lg"
                label="Password"
                placeholder="myPassword"
                {...form.getInputProps('password')}
              />
              <Space h="lg" />
              <Button type="submit">Submit</Button>
            </form>
          </Stack>
        </Center>
      </Container>
    </>
  );
}

export default Login;