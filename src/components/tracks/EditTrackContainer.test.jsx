import { render, screen } from '@testing-library/react';
import mockMediaRecorder from '../../mocks/MockMediaRecorder';
import EditTrackContainer from './EditTrackContainer';

describe('Edit track container', () => {
  beforeEach(() => {
    window.MediaRecorder = jest
      .fn()
      .mockImplementation(() => mockMediaRecorder);
  });
  it('Renders placeholder text', () => {
    render(<EditTrackContainer />);
    const baseContainer = screen.getByText('Edit Track');
    expect(baseContainer).toBeInTheDocument();
  });
});
