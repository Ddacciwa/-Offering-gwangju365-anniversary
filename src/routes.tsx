// src/routes.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Pages
import Home from './pages/Home';
import Essay from './pages/Essay';
import Episodes from './pages/Episodes';
import Gratitude from './pages/Gratitude';
import DreamHospital from './pages/DreamHospital';
import Messages from './pages/Messages';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Define routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/essay',
    element: (
      <ProtectedRoute>
        <Essay />
      </ProtectedRoute>
    ),
  },
  {
    path: '/episodes',
    element: (
      <ProtectedRoute>
        <Episodes />
      </ProtectedRoute>
    ),
  },
  {
    path: '/gratitude',
    element: (
      <ProtectedRoute>
        <Gratitude />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dream-hospital',
    element: (
      <ProtectedRoute>
        <DreamHospital />
      </ProtectedRoute>
    ),
  },
  {
    path: '/messages',
    element: (
      <ProtectedRoute>
        <Messages />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);