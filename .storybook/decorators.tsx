import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

export const withReduxProvider = (Story: React.ComponentType) => (
  <Provider store={store}>
    <Story />
  </Provider>
);
