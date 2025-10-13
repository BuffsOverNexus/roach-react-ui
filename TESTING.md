# Testing Guide

This project uses Jest for unit testing with React Testing Library for component testing.

## Running Tests

- **Run all tests once**: `npm test`
- **Run tests in watch mode**: `npm run test:watch`
- **Run tests with coverage**: `npm run test:coverage`

## Test Structure

### Component Tests
- `App.test.tsx` - Tests for the main App component
- `TailwindTest.test.tsx` - Tests for the TailwindTest component

### Utility Tests
- `utils.test.ts` - Tests for utility functions

## Test Configuration

- **Jest Config**: `jest.config.js`
- **Setup File**: `src/setupTests.ts`
- **Type Declarations**: `src/vite-env.d.ts`, `src/jest-dom.d.ts`

## Test Coverage

The project maintains 100% test coverage across:
- Statements
- Branches  
- Functions
- Lines

Coverage reports are generated in the `coverage/` directory when running `npm run test:coverage`.

## Writing Tests

### Component Testing Patterns

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    const element = screen.getByText('Expected Text');
    expect(element).toBeDefined();
  });

  test('handles user interaction', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    // Assert expected behavior
    expect(screen.getByText('Updated Text')).toBeDefined();
  });
});
```

### Utility Testing Patterns

```tsx
import { describe, test, expect } from '@jest/globals';
import { myUtilFunction } from './utils';

describe('myUtilFunction', () => {
  test('returns expected result for valid input', () => {
    const result = myUtilFunction('input');
    expect(result).toBe('expected output');
  });

  test('handles edge cases', () => {
    expect(myUtilFunction('')).toBe('default value');
    expect(myUtilFunction(null)).toBe('fallback');
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what the component does, not how it does it
2. **Use Descriptive Test Names** - Make it clear what each test is verifying
3. **Arrange, Act, Assert** - Structure tests with clear setup, action, and verification phases
4. **Test Edge Cases** - Include tests for error conditions, empty states, and boundary values
5. **Keep Tests Independent** - Each test should be able to run in isolation
6. **Use Screen Queries Appropriately**:
   - `getByRole()` - Preferred for interactive elements
   - `getByText()` - For text content
   - `getByTestId()` - As a last resort when other queries don't work

## Common Testing Utilities

### React Testing Library Queries
- `screen.getByRole()` - Find by accessibility role
- `screen.getByText()` - Find by text content
- `screen.getByLabelText()` - Find by label text
- `screen.getByPlaceholderText()` - Find by placeholder
- `screen.getByAltText()` - Find by alt text

### User Interactions
- `fireEvent.click()` - Simulate clicks
- `fireEvent.change()` - Simulate input changes
- `fireEvent.submit()` - Simulate form submissions

### Assertions
- `expect(element).toBeDefined()` - Element exists
- `expect(element.textContent).toBe('text')` - Text content matches
- `expect(element.className).toContain('class')` - Has CSS class
- `expect(element.getAttribute('attr')).toBe('value')` - Attribute value matches