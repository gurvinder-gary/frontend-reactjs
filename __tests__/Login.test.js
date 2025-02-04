import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

// Wrap component with router for testing
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  test('renders login form', () => {
    renderWithRouter(<Login />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays error for empty fields', async () => {
    renderWithRouter(<Login />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  test('calls API on valid submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ token: 'fake-token' }) })
    );

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/logged in successfully/i)).toBeInTheDocument();
  });
});
