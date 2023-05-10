import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should fetch and display weather information', async () => {
    const mockWeatherData = {
      main: { temp: 22 },
      weather: [{ main: 'Clear' }],
      name: 'London',
      sys: { country: 'GB' }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData)
      })
    );

    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'London' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 13, charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText('London, GB')).toBeInTheDocument();
      expect(screen.getByText('Clear')).toBeInTheDocument();
      expect(screen.getByText('22°c')).toBeInTheDocument();
    });
  });
});
