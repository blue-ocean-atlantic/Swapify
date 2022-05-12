import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const loginbutton = () => {
    axios.post('/login', {
      username: username,
      password: password,
    })
    .then((data) =>{
      //when correct email and pw combo, redirect to main page
      alert('successful login!');
      navigate("/");
      // console.log('userName is passed back', data);
    })
    .catch((err) => {
      // console.log('err at login button', err);
      window.alert('incorrect login credential');
      setPassword('')
      setUsername('')
    })
  }

    return (
      <div className="form">
        <h2>Log In Page</h2>
        <label>User Name:
          <input type="text" value={username} onChange={(event) => {
            setUsername(event.target.value)
          }}></input>
        </label>
        <label>Password:
          <input type="text" value={password} onChange={(event) => {
            setPassword(event.target.value)
          }}></input>
        </label>
        <button onClick={() => loginbutton()}>Click to Log In</button>
      </div>
    )
}

export default Login;
