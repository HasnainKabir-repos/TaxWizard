import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '/Users/shadmansakib/Desktop/TaxWizard/client/src/components/login.js'; // Adjust the import path as necessary

test('renders login form with email and password inputs and a submit button', () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('allows users to enter their email and password', () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password');

  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password');
});

