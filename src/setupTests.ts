import '@testing-library/jest-dom';

// Global test setup
(globalThis as any).ResizeObserver = class ResizeObserver {
  constructor(_cb: ResizeObserverCallback) {}
  observe(_element: Element): void {}
  unobserve(_element: Element): void {}
  disconnect(): void {}
};

// Mock TextEncoder/TextDecoder for React Router
if (typeof (globalThis as any).TextEncoder === 'undefined') {
  (globalThis as any).TextEncoder = class {
    encode(str: string) {
      return new Uint8Array([...str].map(c => c.charCodeAt(0)));
    }
  };
}

if (typeof (globalThis as any).TextDecoder === 'undefined') {
  (globalThis as any).TextDecoder = class {
    decode(bytes: Uint8Array) {
      return String.fromCharCode(...Array.from(bytes));
    }
  };
}

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