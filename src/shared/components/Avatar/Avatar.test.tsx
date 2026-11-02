import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Avatar from '@shared/components/Avatar/Avatar.tsx';

describe('Avatar', () => {
  it('renders initials from multi-word name (max 2)', () => {
    render(<Avatar userName="Иван Иванов" />);
    expect(screen.getByText('ИИ')).toBeInTheDocument();
  });

  it('renders single initial', () => {
    render(<Avatar userName="Иван" />);
    expect(screen.getByText('И')).toBeInTheDocument();
  });

  it('renders ? when no name', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders image with alt when url provided', () => {
    render(<Avatar url="http://x/a.png" userName="Иван" />);
    const img = screen.getByAltText('Аватар Иван');
    expect(img).toHaveAttribute('src', 'http://x/a.png');
  });

  it('applies size class', () => {
    const { container } = render(<Avatar size="large" userName="Иван" />);
    expect(container.firstChild).toHaveClass('large');
  });
});
