import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders world cup title', () => {
  render(<App />);
  const textElement = screen.getByText(/실시간 월드컵 스케줄/i);
  expect(textElement).toBeDefined();
});
