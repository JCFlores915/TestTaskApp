import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ListScreen from '../src/screens/ListScreen';

const mock = new MockAdapter(axios);

const mockData = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

describe('ListScreen', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('renders loading indicator while fetching data', () => {
    mock.onGet('https://6172cfe5110a740017222e2b.mockapi.io/elements').reply(200, []);
    const { getByTestId } = render(<ListScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders list items correctly after fetching data', async () => {
    mock.onGet('https://6172cfe5110a740017222e2b.mockapi.io/elements').reply(200, mockData);
    const { getByText, queryByTestId } = render(<ListScreen />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    mockData.forEach(item => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it('renders error message on data fetch failure', async () => {
    mock.onGet('https://6172cfe5110a740017222e2b.mockapi.io/elements').reply(500);
    const { getByText, queryByTestId } = render(<ListScreen />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByText('Failed to load data')).toBeTruthy();
    });
  });
});
