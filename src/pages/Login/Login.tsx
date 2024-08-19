import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Login.module.scss';

import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils';
import { useGetUserMutation } from '../../redux/services/autorization/autorization';
import { Navigation } from '../../components/Navigation';

interface LoginForm {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [getUser, { isError, isLoading }] = useGetUserMutation();

  const [loginForm, setLoginForm] = React.useState<LoginForm>({
    username: 'liamg',
    password: 'liamgpass',
  });

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const authData = await getUser({
      username: loginForm.username,
      password: loginForm.password,
      expiresInMins: 60,
    }).unwrap();

    if (authData) {
      localStorage.setItem('token', authData.token);
      navigate('/');
    }
  }

  function onChangeLoginForm(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  React.useEffect(() => {
    if (getToken()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Sign in | Goods4you</title>
      </Helmet>
      <div className='wrapper'>
        <Navigation />
        <main>
          <section className='login-page'>
            <h1>Sign in</h1>
            <form className='form' onSubmit={onSubmitHandler}>
              <label aria-label='Username' className='form__label'>
                <input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='liamg'
                  className={loginForm.username ? 'form__input' : 'form__input form__input--error'}
                  value={loginForm.username}
                  onChange={onChangeLoginForm}
                  aria-required='true'
                  aria-invalid={!loginForm.username}
                  aria-describedby='usernameAlert'
                  autoComplete='username'
                />
              </label>
              {!loginForm.username && (
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
                  className={loginForm.password ? 'form__input' : 'form__input form__input--error'}
                  value={loginForm.password}
                  onChange={onChangeLoginForm}
                  aria-required='true'
                  aria-invalid={!loginForm.password}
                  aria-describedby='passwordAlert'
                  autoComplete='current-password'
                />
              </label>
              {!loginForm.password && (
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
              {isError && (
                <div role='alert' className='form__alert'>
                  Form error
                </div>
              )}
            </form>
          </section>{' '}
        </main>
      </div>
    </>
  );
};
