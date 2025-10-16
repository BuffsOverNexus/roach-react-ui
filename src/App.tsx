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

  // Validate session on app start
  useEffect(() => {
    if (!session.hasValidToken && session.discordUser) {
      console.log('Session expired, logging out...');
      session.logout();
    }
  }, []); // Empty dependency array to only run once on mount

  // Periodic session validation (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!session.hasValidToken && session.discordUser) {
        console.log('Session expired during periodic check, logging out...');
        session.logout();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []); // Empty dependency array for the interval

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