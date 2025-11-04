import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);

        // Wait for auth state to be ready
        const user = await authService.waitForAuthReady();
        
        // Check if session is valid
        const session = authService.getSession();
        
        if (!user || !session) {
          // No valid session, redirect to login
          console.log('No valid session found, redirecting to login...');
          navigate('/login', { replace: true });
          setIsAuthenticated(false);
        } else {
          // Check if session has expired
          if (Date.now() > session.expiresAt) {
            console.log('Session expired, redirecting to login...');
            await authService.logout();
            navigate('/login', { replace: true });
            setIsAuthenticated(false);
          } else {
            console.log('User authenticated:', user.email);
            console.log('Session valid until:', new Date(session.expiresAt).toLocaleString());
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        navigate('/login', { replace: true });
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up periodic session check (every 5 minutes)
    const sessionCheckInterval = setInterval(() => {
      const session = authService.getSession();
      if (!session) {
        console.log('Session lost, redirecting to login...');
        navigate('/login', { replace: true });
        setIsAuthenticated(false);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(sessionCheckInterval);
  }, [navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
};

export default AuthWrapper;