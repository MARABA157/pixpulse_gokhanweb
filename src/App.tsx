import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Loading from './components/Loading';
import RotatingBackground from './components/RotatingBackground';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Explore = lazy(() => import('./pages/Explore'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Create = lazy(() => import('./pages/Create'));
const Messages = lazy(() => import('./pages/Messages'));
const AiChat = lazy(() => import('./pages/AiChat'));
const CreateVideo = lazy(() => import('./pages/CreateVideo'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <RotatingBackground />
          <Navbar />
          <main className="relative z-10 pt-16">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="/settings" element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                } />
                <Route path="/create" element={
                  <PrivateRoute>
                    <Create />
                  </PrivateRoute>
                } />
                <Route path="/messages" element={
                  <PrivateRoute>
                    <Messages />
                  </PrivateRoute>
                } />
                <Route path="/aichat" element={<AiChat />} />
                <Route path="/create-video" element={<CreateVideo />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
};

export default App;