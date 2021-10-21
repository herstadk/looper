import { render, screen } from '@testing-library/react';
import EditTrackContainer from './EditTrackContainer';

describe('Edit track container', () => {
  it('Renders placeholder text', () => {
    render(<EditTrackContainer />);
    const baseContainer = screen.getByText('Edit Track');
    expect(baseContainer).toBeInTheDocument();
  });
});
