import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Login.module.scss';

import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './apiLogin';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, setValid } from './slice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface LoginForm {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isValid } = useSelector(selectAuth);
  const [login, { isLoading, error }] = useLoginMutation();
  const [loginForm, setLoginForm] = React.useState<LoginForm>({
    username: 'emilys',
    password: 'emilyspass',
  });

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    validate();

    if (loginForm.username && loginForm.password) {
      try {
        await login({ username: loginForm.username, password: loginForm.password }).unwrap();
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validate = () => {
    dispatch(setValid(Boolean(loginForm.username && loginForm.password)));
  };

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (error && 'data' in error) {
      return (error.data as { message?: string }).message || 'An error occurred';
    }
    if (error && 'message' in error) {
      return error.message;
    }
    return null;
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
              placeholder='liamg'
              className={
                loginForm.username || isValid ? 'form__input' : 'form__input form__input--error'
              }
              value={loginForm.username}
              onChange={setText}
              aria-required='true'
              aria-invalid={!loginForm.username && !isValid}
              aria-describedby='usernameAlert'
              autoComplete='username'
            />
          </label>
          {!isValid && !loginForm.username && (
            <div role='alert' aria-atomic='true' id='usernameAlert' className='form__alert'>
              You must enter a username
            </div>
          )}
          <label aria-label='Password' className='form__label'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='liamgpass'
              className={
                loginForm.password || isValid ? 'form__input' : 'form__input form__input--error'
              }
              value={loginForm.password}
              onChange={setText}
              aria-required='true'
              aria-invalid={!loginForm.password && !isValid}
              aria-describedby='passwordAlert'
              autoComplete='current-password'
            />
          </label>
          {!isValid && !loginForm.password && (
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
            {isLoading ? (
              <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
                <radialGradient
                  id='a12'
                  cx='.66'
                  fx='.66'
                  cy='.3125'
                  fy='.3125'
                  gradientTransform='scale(1.5)'
                >
                  <stop offset='0' stop-color='#FFF8F9'></stop>
                  <stop offset='.3' stop-color='#FFF8F9' stop-opacity='.9'></stop>
                  <stop offset='.6' stop-color='#FFF8F9' stop-opacity='.6'></stop>
                  <stop offset='.8' stop-color='#FFF8F9' stop-opacity='.3'></stop>
                  <stop offset='1' stop-color='#FFF8F9' stop-opacity='0'></stop>
                </radialGradient>
                <circle
                  transform-origin='center'
                  fill='none'
                  stroke='url(#a12)'
                  stroke-width='15'
                  stroke-linecap='round'
                  stroke-dasharray='200 1000'
                  stroke-dashoffset='0'
                  cx='100'
                  cy='100'
                  r='70'
                >
                  <animateTransform
                    type='rotate'
                    attributeName='transform'
                    calcMode='spline'
                    dur='2'
                    values='360;0'
                    keyTimes='0;1'
                    keySplines='0 0 1 1'
                    repeatCount='indefinite'
                  ></animateTransform>
                </circle>
                <circle
                  transform-origin='center'
                  fill='none'
                  opacity='.2'
                  stroke='#FFF8F9'
                  stroke-width='15'
                  stroke-linecap='round'
                  cx='100'
                  cy='100'
                  r='70'
                ></circle>
              </svg>
            ) : (
              'Sign in'
            )}
          </button>
          {error && (
            <div role='alert' className='form__alert'>
              {getErrorMessage(error)}
            </div>
          )}
        </form>
      </section>
    </>
  );
};
