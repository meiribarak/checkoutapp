import React, { useState } from 'react';

const juxtalogo = 'https://www.juxta.ai/build/img/logo.svg'

function LoginPage2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted');
    console.log(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="logo-placeholder">
            <img src={juxtalogo} alt="logo" />
      </div>
      <br />
      <label>Enter username and password to login to checkout application</label>
      <br />      
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={event => {
            console.log('Email changed');
            setEmail(event.target.value);
          }}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={event => {
            console.log('Password changed'); // Debugging line
            setPassword(event.target.value);
          }}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginPage2;


