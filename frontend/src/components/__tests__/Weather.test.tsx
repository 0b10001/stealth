import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Weather from '../Weather';

// Mock environment variable
vi.mock('../env', () => ({
  VITE_OPENWEATHER_API_KEY: 'test-api-key'
}));

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({
      data: {
        main: { temp: 20, humidity: 65 },
        weather: [{ description: 'clear sky', icon: '01d' }],
        name: 'London'
      }
    }))
  }
}));

describe('Weather Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders weather information', async () => {
    render(<Weather />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading weather data...')).not.toBeInTheDocument();
    });
    
    // Check if the search input is rendered
    expect(screen.getByPlaceholderText(/enter city name/i)).toBeInTheDocument();
    
    // Check if the search button is rendered
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('allows searching for a city', async () => {
    render(<Weather />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading weather data...')).not.toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/enter city name/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    // Type in the search input
    fireEvent.change(searchInput, { target: { value: 'London' } });
    
    // Click the search button
    fireEvent.click(searchButton);
    
    // Wait for the weather information to be displayed
    await waitFor(() => {
      expect(screen.getByText(/london/i)).toBeInTheDocument();
      expect(screen.getByText(/20°c/i)).toBeInTheDocument();
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    });
  });
}); 