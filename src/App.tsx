import './App.css'
import PageRouter from '@components/router/PageRouter';
import HeaderComponent from './components/header/HeaderComponent';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isTextPage = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/setup';

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