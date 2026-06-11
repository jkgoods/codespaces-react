import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders world cup title', () => {
  render(<App />);
  const textElement = screen.getByText(/오늘의 월드컵 매치업/i);
  expect(textElement).toBeDefined();
});
