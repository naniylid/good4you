import React from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useGetUserByTokenQuery } from '../redux/services/autorization/autorization';
import { getErrorStatus, getToken } from '../utils';
import useAuth from '../hooks/useAuth';
import './MainLayout.module.scss';

import { Navigation } from '../components/Navigation';
import { Loading } from '../components/ui/Loading';

const MainLayout: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { data, isError, error } = useGetUserByTokenQuery('', { skip: !getToken() || !!auth });

    React.useEffect(() => {
        window.addEventListener('storage', () => {
            navigate('/login');
        });
    }, [navigate]);

    React.useEffect(() => {
        if (isError || !getToken()) {
            navigate('/login');
        }
    }, [isError, navigate]);

    React.useEffect(() => {
        if (getErrorStatus(error) === 401 || getErrorStatus(error) === 403) {
            localStorage.removeItem('token');
        }
    }, [error]);

    return (
        <div className='wrapper'>
            {data || auth ? (
                <>
                    <Navigation />
                    <main>
                        <Outlet />{' '}
                    </main>
                    <footer className='footer layout' aria-label='Breadcrumb'>
                        <NavLink to='/' aria-current='page'>
                            <h3 className='footer__logo'>Goods4you</h3>
                        </NavLink>
                        <ul className='footer__menu' role='list'>
                            <li>
                                <Link to='/#catalog'>Catalog</Link>{' '}
                            </li>
                            <li>
                                <Link to='/#faq'>FAQ</Link>{' '}
                            </li>
                        </ul>
                    </footer>
                </>
            ) : (
                <>
                    <Loading />
                </>
            )}
        </div>
    );
};

export default MainLayout;
