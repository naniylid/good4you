import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Login.module.scss';

import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './apiLogin';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, setUsername, setPassword, setValid } from './slice';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { username, password, isValid } = useSelector(selectAuth);

  const [login, { isLoading, error }] = useLoginMutation();

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    validate();

    if (username && password) {
      try {
        await login({ username, password }).unwrap();
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  const setText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'username') {
      dispatch(setUsername(value));
    } else if (name === 'password') {
      dispatch(setPassword(value));
    }
  };

  const validate = () => {
    dispatch(setValid(Boolean(username && password)));
  };

  return (
    <>
      <Helmet>
        <title>Sign in | Goods4you</title>
      </Helmet>
      <section className='login-page'>
        <h1>Sign in</h1>
        <form className='form' onSubmit={handleLogin}>
          <label aria-label='Username' className='form__label'>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Login'
              className={username || isValid ? 'form__input' : 'form__input form__input--error'}
              value={username}
              onChange={setText}
              aria-required='true'
              aria-invalid={!username && !isValid}
              aria-describedby='usernameAlert'
            />
          </label>
          {!isValid && !username && (
            <div role='alert' aria-atomic='true' id='usernameAlert' className='form__alert'>
              You must enter a username
            </div>
          )}
          <label aria-label='Password' className='form__label'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className={password || isValid ? 'form__input' : 'form__input form__input--error'}
              value={password}
              onChange={setText}
              aria-required='true'
              aria-invalid={!password && !isValid}
              aria-describedby='passwordAlert'
            />
          </label>
          {!isValid && !password && (
            <div
              aria-live='polite'
              role='alert'
              aria-atomic='true'
              id='passwordAlert'
              className='form__alert'
            >
              You must enter a password
            </div>
          )}
          <button type='submit' className='form__submit' disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
          {error && (
            <div role='alert' className='form__alert'>
              {error.message}
            </div>
          )}
        </form>
      </section>
    </>
  );
};
