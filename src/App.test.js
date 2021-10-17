import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders placeholder text', () => {
  render(<App />);
  const text = screen.getByText('Hello world');
  expect(text).toBeInTheDocument();
});
