import { render, screen, fireEvent } from '@testing-library/react';
import { RecentMatch } from '../RecentMatch';

describe('RecentMatch', () => {
  const defaultProps = {
    tournament: 'LEC',
    team1: 'G2',
    team2: 'FNC',
    score1: 2,
    score2: 1,
    bo: 3
  };

  it('renders match information correctly', () => {
    render(<RecentMatch {...defaultProps} />);

    expect(screen.getByText('LEC')).toBeInTheDocument();
    expect(screen.getByText('G2 2 - 1 FNC')).toBeInTheDocument();
    expect(screen.getByText('(BO3)')).toBeInTheDocument();
  });

  it('handles click event when onClick is provided', () => {
    const handleClick = jest.fn();
    render(<RecentMatch {...defaultProps} onClick={handleClick} />);

    const matchContainer = screen.getByText('G2 2 - 1 FNC').parentElement;
    fireEvent.click(matchContainer!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not show pointer cursor when onClick is not provided', () => {
    render(<RecentMatch {...defaultProps} />);

    const matchContainer = screen.getByText('G2 2 - 1 FNC').parentElement;
    expect(matchContainer).toHaveStyle({ cursor: 'default' });
  });

  it('shows pointer cursor when onClick is provided', () => {
    render(<RecentMatch {...defaultProps} onClick={() => {}} />);

    const matchContainer = screen.getByText('G2 2 - 1 FNC').parentElement;
    expect(matchContainer).toHaveStyle({ cursor: 'pointer' });
  });
}); 