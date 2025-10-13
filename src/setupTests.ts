import '@testing-library/jest-dom';

// Global test setup
(globalThis as any).ResizeObserver = class ResizeObserver {
  constructor(_cb: ResizeObserverCallback) {}
  observe(_element: Element): void {}
  unobserve(_element: Element): void {}
  disconnect(): void {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});