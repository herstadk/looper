import { render, screen } from '@testing-library/react';
import App from './App';
import MockMediaRecorder from './mocks/MockMediaRecorder';

describe('App', () => {
  beforeEach(() => {
    window.MediaRecorder = jest
      .fn()
      .mockImplementation(() => MockMediaRecorder);
  });

  it('Renders base container', () => {
    render(<App />);
    const baseContainer = screen.getByTestId('base-container');
    expect(baseContainer).toBeInTheDocument();
  });
});
