import { render, screen } from '@testing-library/react';
import MockMediaRecorder from '../../mocks/MockMediaRecorder';
import EditTrackContainer from './EditTrackContainer';

describe('Edit track container', () => {
  beforeEach(() => {
    window.MediaRecorder = jest
      .fn()
      .mockImplementation(() => MockMediaRecorder);
  });
  it('Renders placeholder text', () => {
    render(<EditTrackContainer />);
    const baseContainer = screen.getByText('Edit Track');
    expect(baseContainer).toBeInTheDocument();
  });
});
