import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Renders base container', () => {
    render(<App />);
    const baseContainer = screen.getByTestId('base-container');
    expect(baseContainer).toBeInTheDocument();
  });
});
