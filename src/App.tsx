import { useEffect } from 'react';
import './App.css'
import PageRouter from '@components/router/PageRouter';
import HeaderComponent from './components/header/HeaderComponent';
import { useLocation } from 'react-router-dom';
import { useSession } from '@/utils/useSession';

function App() {
  const location = useLocation();
  const isTextPage = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/setup';
  const session = useSession();

  // Validate session on app start - but not during login process
  useEffect(() => {
    // Don't validate session during login process
    if (location.pathname === '/login/success') {
      return;
    }

    if (!session.hasValidToken && session.discordUser) {
      console.log('Session expired, logging out...');
      session.logout();
    }
  }, [location.pathname]); // Depend on pathname to avoid interfering with login

  // Periodic session validation (every 5 minutes) - but not during login
  useEffect(() => {
    const interval = setInterval(() => {
      // Don't validate during login process
      if (location.pathname === '/login/success') {
        return;
      }

      if (!session.hasValidToken && session.discordUser) {
        console.log('Session expired during periodic check, logging out...');
        session.logout();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [location.pathname]); // Include location to respect login state

  return (
    <div className="">
      <HeaderComponent />
      <div className={(isTextPage) ? "" : "pt-4"}>
        <PageRouter />
      </div>
    </div>
  );
}

export default App;