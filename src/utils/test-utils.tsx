import { cleanup, render, RenderOptions } from '@testing-library/react';

import { ReactElement, ReactNode } from 'react';
import { afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '../redux/store';

afterEach(() => {
  cleanup();
});

type WrapperProps = {
  children: ReactNode;
};

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <Provider store={store}>
      <HelmetProvider>{children}</HelmetProvider>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
