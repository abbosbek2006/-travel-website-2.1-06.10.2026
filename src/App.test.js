import { render, screen } from '@testing-library/react';
import App from './App';

test('opens the Tripwise home page and notifications link', () => {
  sessionStorage.setItem('tripwise-welcome-seen', '1');
  sessionStorage.setItem('tripwise-promo-hidden', '1');
  window.location.hash = 'home';
  window.matchMedia = () => ({ matches: true });
  render(<App />);
  expect(screen.getByRole('heading', { name: /Dunyo sizni/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Bildirishnomalar' })).toHaveAttribute('href', '#notifications');
});
