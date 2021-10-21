import { render, screen } from '@testing-library/react';
import CreateTrackContainer from './CreateTrackContainer';

describe('Create track container', () => {
  it('Renders placeholder text', () => {
    render(<CreateTrackContainer />);
    const baseContainer = screen.getByText('Create Track');
    expect(baseContainer).toBeInTheDocument();
  });
});
