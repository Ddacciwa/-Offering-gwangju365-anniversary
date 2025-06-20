// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/globals.css';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;