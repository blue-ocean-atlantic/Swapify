import React from 'react';
// import Test from './Test/Test.jsx';
import axios from 'axios';

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
