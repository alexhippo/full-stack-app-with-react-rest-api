import React, { useState, useContext } from 'react';
import Context from '../Context';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UserSignIn = () => {
  const context = useContext(Context.Context);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);


  let navigate = useNavigate();
  let location = useLocation();

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'emailAddress') {
      setEmailAddress(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  }

  const submit = (event) => {
    event.preventDefault();
    const { from } = location.state || { from: { pathname: '/' } };

    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors({ errors: ['Sign in was unsuccessful'] });
          console.log(errors);
        } else {
          navigate(from);
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  }

  const cancel = () => {
    navigate('/');
  }

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form>
        {errors.length ?
          <div>
            <h3 className="validation--errors--label">Validation errors</h3>
            <div className="validation-errors">
              <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
              </ul>
            </div>
          </div>
          : null
        }
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={password} onChange={onChange} />
        <button className="button" type="submit" onClick={submit}>Sign In</button>
        <button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
      <p>Don't have a user account? Click here to <Link to='/signup'>sign up!</Link></p>

    </div>
  );
}

export default UserSignIn;
