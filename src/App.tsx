import './styles/App.scss';
import AppRoutes from './routes/routes';
import { useAuth } from './pages/Login/useAuth';

function App() {
  useAuth();
  return <AppRoutes />;
}

export default App;
