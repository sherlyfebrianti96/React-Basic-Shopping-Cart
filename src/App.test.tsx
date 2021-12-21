import { render } from '@testing-library/react';
import App from './App';

test('should render the app', () => {
  const view = render(<App />);
  expect(view).toBeTruthy();
});
