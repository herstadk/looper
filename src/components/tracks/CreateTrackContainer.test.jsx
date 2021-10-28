import { render, screen } from '@testing-library/react';
import MockMediaRecorder from '../../mocks/MockMediaRecorder';
import CreateTrackContainer from './CreateTrackContainer';

describe('Create track container', () => {
  beforeEach(() => {
    window.MediaRecorder = jest
      .fn()
      .mockImplementation(() => MockMediaRecorder);
  });

  it('Renders placeholder text', () => {
    render(<CreateTrackContainer />);
    const baseContainer = screen.getByText('Create Track');
    expect(baseContainer).toBeInTheDocument();
  });
});
