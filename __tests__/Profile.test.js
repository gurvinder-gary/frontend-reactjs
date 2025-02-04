import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../components/Profile';

describe('Profile Component', () => {
  test('renders user profile information', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };

    render(
      <BrowserRouter>
        <Profile user={user} />
      </BrowserRouter>
    );

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });

  test('shows error if user data is missing', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    expect(screen.getByText(/no user data available/i)).toBeInTheDocument();
  });
});
