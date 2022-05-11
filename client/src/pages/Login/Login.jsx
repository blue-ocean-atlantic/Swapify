import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
    };
    this.setUserName = this.setUserName.bind(this);
    this.setPW = this.setPW.bind(this);
    this.loginbutton = this.loginbutton.bind(this);
  }

  setUserName(event) {
    this.setState({ userName: event.target.value })
  }

  setPW(event) {
    this.setState({ password: event.target.value })
  }

  loginbutton() {
    console.log('state at login', this.state);
    axios.post('/login', {
      userName: this.state.userName,
      password: this.state.password,
    })
    .catch((err) => {
      console.log('err at login button', err);
    })
  }

  render() {

    return (
      <div className="form">
        <h2>Log In Page</h2>
        <label>User Name:
          <input type="text" value={this.state.userName} onChange={this.setUserName}></input>
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
