import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';




test('renders the ProductList', () => {
  const {getByText} = render(<ProductList />);
  const linkElement = getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});



  test('renders codes', () => {
    render(<ProductList />);
    screen.debug
  });
