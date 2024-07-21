import { render } from './utils/test-utils';
import { describe, it } from 'vitest';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('проверка доступности текста vite и реагирования', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
});
