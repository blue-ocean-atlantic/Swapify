import React, { useState } from 'react';
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import { useNavigate } from "react-router-dom";
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
  PasswordInput
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import NavBar from '../../components/NavBar/NavBar.jsx';

const schema = z.object({
  firstName: z.string().min(1, { message: 'Name should have at least 1 letter' }),
  lastName: z.string().min(1, { message: 'Name should have at least 1 letter' }),
  zipCode: z.string().min(5, { message: 'Zipcode should consist of 5 numbers' }),
  email: z.string().email({ message: 'Must input a valid email address' }),
  password: z.string().min(5, { message: 'Password should have at least 5 characters' }),
  passwordConfirm: z.string().min(2, { message: 'Password should have at least 5 characters' }),
});

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      zipCode: '',
      password: '',
    };
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.setZipCode = this.setZipCode.bind(this);
    this.setPW = this.setPW.bind(this);
    this.signupbutton = this.signupbutton.bind(this)
  }

  setFirstName(event) {
    this.setState({ firstName: event.target.value })
  }

  setLastName(event) {
    this.setState({ lastName: event.target.value })
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setUserName(event) {
    this.setState({ userName: event.target.value })
  }

  setZipCode(event) {
    this.setState({ zipCode: event.target.value })
  }

  setPW(event) {
    this.setState({ password: event.target.value })
  }

  signupbutton() {
    // console.log('state at signup', this.state);
    axios.post('/signup', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      userName: this.state.userName,
      zipCode: this.state.zipCode,
      password: this.state.password,
    })
    .then((data) => {
      console.log('data from server:', data);
      if (data.data === 'fail') {
        alert('Email or username already exists, choose a different one!')
        window.location = '/signup';
      } else if (data.data ==='success') {
        alert('Profile Created!');
        window.location = '/login';
      }
    })
    .catch((err) => {
      console.log('err at signup', err);
    })
  }

  render() {
    return (
      <div className="form">
        <h2>Sign Up Page</h2>
        <label>First Name:
          <input type="text" value={this.state.firstName} onChange={this.setFirstName} ></input>
        </label>
        <label>Last Name:
          <input type="text" value={this.state.lastName} onChange={this.setLastName} ></input>
        </label>
        <label>Email:
          <input type="text" value={this.state.email} onChange={this.setEmail}></input>
        </label>
        <label>Zip Code:
          <input type="text" value={this.state.zipCode} onChange={this.setZipCode}></input>
        </label>
        <label>User Name:
          <input type="text" value={this.state.userName} onChange={this.setUserName}></input>
        </label>
        <label>Password:
          <input type="text" value={this.state.password} onChange={this.setPW}></input>
        </label>
        <button onClick={this.signupbutton}>Click to Sign Up</button>
      </div>
    )
  }
}

export default Signup;


// function Signup() {
//   const navigate = useNavigate();
//   const [zipError, setZipError] = useState('')
//   const [passwordError, setPasswordError] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const form = useForm({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       zipCode: '',
//       email: '',
//       password: '',
//       passwordConfirm: '',
//     },
//     schema: zodResolver(schema),
//   });

//   const signup = (values) => {
//     if (values.password !== values.passwordConfirm) {
//       setPasswordError('passwords do not match.')
//       return;
//     } else {
//       setPasswordError('')
//     }
//     if (!postcodeValidator(`${values.zipCode}`, 'US')) {
//       setZipError('invalid zipCode')
//       return;
//     } else {
//       setZipError('')
//     }
//     delete values['passwordConfirm']

//     axios({
//       method: 'post',
//       url: 'http://localhost:3000/signup',
//       data: values,
//     }).then(res => {
//       navigate('/login')
//     }).catch(err => {
//       setEmailError('email already exists')
//     });
//   }

//   return (
//     <>
//       <NavBar />
//       <Space h="lg" />
//       <Container
//         radius="xl"
//         p={45}
//         style={{ backgroundColor: 'white', borderRadius: 15 }}
//       >
//         <Title order={1}>Sign-up</Title>
//         <Space h="lg" />

//         <Stack align="center">
//           <form
//             onSubmit={form.onSubmit((values) => {
//               console.log(values);
//               signup(values)
//             })}
//           >
//             <Group >
//               <TextInput
//                 size="lg"
//                 label="First Name"
//                 placeholder="Frank"
//                 {...form.getInputProps('firstName')}
//               />
//               <TextInput
//                 size="lg"
//                 label="Last Name"
//                 placeholder="Senatra"
//                 {...form.getInputProps('lastName')}
//               />
//             </Group>
//             <Space h="lg" />
//             <Group>
//               <TextInput
//                 error={zipError}
//                 size="lg"
//                 label="Zip Code"
//                 placeholder="5-digit zip"
//                 {...form.getInputProps('zipCode')}
//               />
//               <TextInput
//                 size="lg"
//                 label="Email"
//                 placeholder="example@example.com"
//                 {...form.getInputProps('email')}
//               />
//             </Group>
//             <Space h="lg" />

//             <PasswordInput
//               error={passwordError}
//               size="lg"
//               label="Password"
//               placeholder="myPassword"
//               {...form.getInputProps('password')}
//             />
//             <Space h="lg" />
//             <PasswordInput
//               error={passwordError}
//               size="lg"
//               label="Confirm Password"
//               placeholder="myPassword again!"
//               {...form.getInputProps('passwordConfirm')}
//             />
//             <Space h="lg" />
//             <Button type="submit">Submit</Button>
//           </form>
//         </Stack>
//       </Container>
//     </>
//   );
// }

// export default Signup;