import { render, screen } from '@testing-library/react';
import RecordButton from './RecordButton';

describe('Record button', () => {
  it('Renders play button when not recording', () => {
    render(<RecordButton isRecording={false} />);
    const playIcon = screen.queryByTestId('play-icon');
    expect(playIcon).toBeInTheDocument();
  });

  it('Renders stop button when recording', () => {
    render(<RecordButton isRecording={true} />);
    const playIcon = screen.queryByTestId('stop-icon');
    expect(playIcon).toBeInTheDocument();
  });
});
