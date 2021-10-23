import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    window.MediaRecorder = jest
      .fn()
      .mockImplementation(() => mockMediaRecorder);
  });
  it('Renders base container', () => {
    render(<App />);
    const baseContainer = screen.getByTestId('base-container');
    expect(baseContainer).toBeInTheDocument();
  });
});
