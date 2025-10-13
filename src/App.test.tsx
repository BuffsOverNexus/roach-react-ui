import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import App from './App';

describe('App Component', () => {
  test('renders TailwindTest component', () => {
    render(<App />);
    const tailwindTest = screen.getByText(/if you can see this styled properly/i);
    expect(tailwindTest).toBeDefined();
  });

  test('renders the TailwindTest heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /tailwind css v4 test/i });
    expect(heading).toBeDefined();
  });

  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeDefined();
  });

  test('has proper container structure', () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector('div[style*="marginTop"]');
    expect(mainDiv).toBeDefined();
  });
});