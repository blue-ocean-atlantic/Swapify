import React, { useState } from 'react';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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
  PasswordInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import NavBar from '../../components/NavBar/NavBar.jsx';

const schema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Name should have at least 1 letter' }),
  lastName: z
    .string()
    .min(1, { message: 'Name should have at least 1 letter' }),
  zipCode: z
    .string()
    .min(5, { message: 'Zipcode should consist of 5 numbers' }),
  username: z
    .string()
    .min(5, { message: 'user name should consist of at least 5 letters' }),
  email: z.string().email({ message: 'Must input a valid email address' }),
  password: z
    .string()
    .min(5, { message: 'Password should have at least 5 characters' }),
  passwordConfirm: z
    .string()
    .min(2, { message: 'Password should have at least 5 characters' }),
});

function Signup() {
  const navigate = useNavigate();
  const [zipError, setZipError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      zipCode: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    schema: zodResolver(schema),
  });

  const signupbutton = (values) => {
    console.log('signupbutton data:', values);

    if (values.password !== values.passwordConfirm) {
      setPasswordError('passwords do not match.');
      return;
    } else {
      setPasswordError('');
    }
    if (!postcodeValidator(`${values.zipCode}`, 'US')) {
      setZipError('invalid zipCode');
      return;
    } else {
      setZipError('');
    }
    delete values['passwordConfirm'];

    axios
      .post('http://localhost:3005/signup', { values })
      .then((data) => {
        console.log('data from server:', data);
        if (data.data === 'fail') {
          alert('Email or username already exists, choose a different one!');
          // navigate('/');
        } else if (data.data === 'success') {
          // alert('Profile Created!');
          navigate('/');
        }
      })
      .catch((err) => {
        console.log('err at signup', err);
      });
  };

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
          <form onSubmit={form.onSubmit(signupbutton)}>
            <Group>
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
                error={zipError}
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
            <TextInput
              size="lg"
              label="User Name"
              placeholder="User Name"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              error={passwordError}
              size="lg"
              label="Password"
              placeholder="myPassword"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              error={passwordError}
              size="lg"
              label="Confirm Password"
              placeholder="myPassword again!"
              {...form.getInputProps('passwordConfirm')}
            />
            <Space h="lg" />
            <Space h="lg" />
            <Button type="submit">Submit</Button>
          </form>
        </Stack>
      </Container>
    </>
  );
}

export default Signup;
