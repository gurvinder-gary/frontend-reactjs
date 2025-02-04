import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../components/Register';

describe('Register Component', () => {
  test('renders registration form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('displays error for empty fields', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });

  test('calls API on valid submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ message: 'Registered successfully' }) })
    );

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/registered successfully/i)).toBeInTheDocument();
  });
});
