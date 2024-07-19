import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import NotFound from '../pages/NotFound';
import { Home } from '../pages/Home/Home';
import { ProductPage } from '../pages/Product/ProductPage';
import { Cart } from '../pages/Cart/Cart';
import { Login } from '../pages/Login/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
