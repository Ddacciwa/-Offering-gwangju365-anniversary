// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
// If using Tailwind, you'd import tailwind here instead
// import './index.css'; // Where tailwind directives are

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;