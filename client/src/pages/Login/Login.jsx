import React, { useState } from 'react';
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
  email: z.string().email({ message: 'Must input a valid email address' }),
  password: z
    .string()
    .min(5, { message: 'Password should have at least 5 characters' }),
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginbutton = () => {
    axios
      .post('http://localhost:3005/login', {
        username: username,
        password: password,
      })
      .then((data) => {
        alert('Successful Login!');
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log('err at login button', err);
        alert('Incorrect Login Credential');
        setPassword('');
        setUsername('');
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
        <Title order={1}>Login</Title>
        <Center>
          <Space h="lg" />
          <Stack align="center">
            <form>
              <Space h="lg" />
              <TextInput
                size="lg"
                label="Username: "
                placeholder="Your Username here"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <Space h="lg" />
              <PasswordInput
                size="lg"
                label="Password: "
                placeholder="Your Password Here"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <Space h="lg" />
              <Button
                type="submit"
                onClick={() => loginbutton()}
                component={Link}
                to="/"
              >
                Submit
              </Button>
            </form>
          </Stack>
        </Center>
      </Container>
    </>
  );
};

export default Login;
