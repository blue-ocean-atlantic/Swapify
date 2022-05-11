import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    };
    this.setEmail = this.setEmail.bind(this);
    this.setPW = this.setPW.bind(this);
    this.loginbutton = this.loginbutton.bind(this);
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setPW(event) {
    this.setState({ password: event.target.value })
  }

  loginbutton() {
    console.log('state at login', this.state);
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password,
    })
    .then((data) =>{
      //when correct email and pw combo, redirect to main page
      //CHANGE GLOBAL STATE HERE
      alert('successful login!');
      window.location = '/';
      console.log('userName is passed back', data);
    })
    .catch((err) => {
      console.log('err at login button', err);
      window.alert('incorrect login credential');
      window.location = '/login';
    })
  }

  render() {

    return (
      <div className="form">
        <h2>Log In Page</h2>
        <label>Email:
          <input type="text" value={this.state.email} onChange={this.setEmail}></input>
        </label>
        <label>Password:
          <input type="text" value={this.state.password} onChange={this.setPW}></input>
        </label>
        <button onClick={this.loginbutton}>Click to Log In</button>
      </div>
    )
  }
}

export default Login;
