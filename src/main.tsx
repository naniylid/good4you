import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CartProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </CartProvider>
  </BrowserRouter>,
);
