import { render, screen, cleanup } from '@testing-library/react';
import Home from '../src/components/Header';
import Search from '../src/components/Search';
import Main from '../src/components/Main';

afterAll(cleanup);

describe('Home', () => {
  test('home page should render the header', () => {
    render(<Home />);
    const heading = screen.getByText(/connect spotify/i);
    expect(heading).toBeDefined();
  });
  test('home page should render main component', () => {});
});
