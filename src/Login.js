import React, { Component } from 'react';
import App from './App';
import './Login.css'; 

class Login extends Component {

    constructor() {
      super();
      this.state = {login: false};
    }

    handleSubmit = event => {
      event.preventDefault();
      this.setState({ login: true });
    }
  
  render() {
    return (
      this.state.login ? <App /> : <div className="login__wrapper">
      <h1 className="login__title">RoboTO</h1>
      <p className="login__subtitle">Never miss a moment ...</p>
      <form className="login__form" onSubmit={this.handleSubmit}>
            <input className="login__input" placeholder="Username" />
            <input className="login__input" placeholder="Password" type="password" />
            <button className="login__submit" type="submit">Login</button>
            <div className="login__signup">Not a member yet ? <a className="signup_link" href="#">Sign up</a></div>
          </form>
      </div>
    )
  }
}

export default Login