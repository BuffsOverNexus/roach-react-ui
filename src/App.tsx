import './App.css'
import PageRouter from '@components/router/PageRouter';
import HeaderComponent from './components/header/HeaderComponent';

function App() {
  return (
    <div className="">
      <HeaderComponent />
      <div className="pt-4">
        <PageRouter />
      </div>
    </div>
  );
}

export default App;