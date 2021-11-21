import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  let navigate = useNavigate();

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'firstName') {
      setFirstName(value);
    }

    if (name === 'lastName') {
      setLastName(value);
    }

    if (name === 'emailAddress') {
      setEmailAddress(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  }

  const submit = () => {

  }

  const cancel = () => {
    navigate('/');
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      <form>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" value={firstName} onChange={onChange} />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" value={lastName} onChange={onChange} />
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={password} onChange={onChange} />
        <button className="button" type="submit" onClick={submit}>Sign Up</button>
        <button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
      <p>Already have a user account? Click here to <Link to='/signin'>sign in!</Link></p>

    </div>
  );
}

export default UserSignUp;
