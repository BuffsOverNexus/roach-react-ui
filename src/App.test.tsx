import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test } from '@jest/globals';
import { PrimeReactProvider } from "primereact/api";
import App from './App';

// Helper function to render App with required providers
const renderApp = () => {
  return render(
    <PrimeReactProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderApp();
  });

});