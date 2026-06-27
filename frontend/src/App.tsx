import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAuthStore } from './store/useAuthStore';
import { supabase } from './services/supabase';

// Pages
import Landing from './pages/public/Landing';
import PortfolioView from './pages/portfolio/PortfolioView';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/dashboard/Home';
import Profile from './pages/dashboard/Profile';
import Projects from './pages/dashboard/Projects';
import Skills from './pages/dashboard/Skills';
import Experience from './pages/dashboard/Experience';
import Education from './pages/dashboard/Education';
import Certificates from './pages/dashboard/Certificates';
import Achievements from './pages/dashboard/Achievements';
import Resume from './pages/dashboard/Resume';
import SocialLinks from './pages/dashboard/SocialLinks';
import Theme from './pages/dashboard/Theme';
import AdminDashboard from './pages/admin/AdminDashboard';
import Settings from './pages/dashboard/Settings';

import Terms from './pages/public/Terms';
import Privacy from './pages/public/Privacy';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const setAuth = useAuthStore((state) => state.setAuth);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuth({
          id: session.user.id,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'user',
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || 'User',
        }, session.access_token);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth({
          id: session.user.id,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'user',
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || 'User',
        }, session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuth]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<div className="text-white bg-black min-h-screen p-8">Features Coming Soon</div>} />
          <Route path="/pricing" element={<div className="text-white bg-black min-h-screen p-8">Pricing Coming Soon</div>} />
          <Route path="/templates" element={<div className="text-white bg-black min-h-screen p-8">Templates Coming Soon</div>} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="resume" element={<Resume />} />
          <Route path="social-links" element={<SocialLinks />} />
          <Route path="theme" element={<Theme />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Dynamic Portfolio Route - Must be last */}
        <Route path="/:username" element={<PortfolioView />} />
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
