import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';
import { Provider } from 'react-redux';
import store from '../store';

test('renders contact form and submits data', () => {
  render(
    <Provider store={store}>
      <ContactForm  />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });

  fireEvent.click(screen.getByText(/submit/i));

  expect(screen.getByLabelText(/name/i)).toHaveValue('');
  expect(screen.getByLabelText(/email/i)).toHaveValue('');
  expect(screen.getByLabelText(/phone/i)).toHaveValue('');
});
