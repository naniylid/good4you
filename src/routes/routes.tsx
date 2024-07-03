import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';

import MainLayout from '../layout/MainLayout';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path='/product/:id' element={<Film />} /> */}
        {/* <Route path='/cart' element={<Film />} /> */}

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
