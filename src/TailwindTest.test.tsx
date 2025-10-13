import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import TailwindTest from './TailwindTest';

describe('TailwindTest Component', () => {
  test('renders the main heading', () => {
    render(<TailwindTest />);
    const heading = screen.getByRole('heading', { name: /tailwind css v4 test/i });
    expect(heading).toBeDefined();
  });

  test('renders the description text', () => {
    render(<TailwindTest />);
    const description = screen.getByText(/if you can see this styled properly, tailwind css v4 is working!/i);
    expect(description).toBeDefined();
  });

  test('has the correct CSS classes on container div', () => {
    render(<TailwindTest />);
    const container = screen.getByRole('heading').parentElement;
    expect(container?.className).toContain('p-8');
    expect(container?.className).toContain('bg-blue-500');
    expect(container?.className).toContain('text-white');
    expect(container?.className).toContain('rounded-lg');
    expect(container?.className).toContain('shadow-lg');
  });

  test('has the correct CSS classes on heading', () => {
    render(<TailwindTest />);
    const heading = screen.getByRole('heading', { name: /tailwind css v4 test/i });
    expect(heading.className).toContain('text-2xl');
    expect(heading.className).toContain('font-bold');
    expect(heading.className).toContain('mb-4');
  });

  test('has the correct CSS classes on paragraph', () => {
    render(<TailwindTest />);
    const paragraph = screen.getByText(/if you can see this styled properly/i);
    expect(paragraph.className).toContain('text-blue-100');
  });

  test('renders as a complete component', () => {
    const { container } = render(<TailwindTest />);
    expect(container.firstChild).toBeDefined();
  });
});