import { useAuth } from './context/AuthContext';

// Custom hook for authenticated fetch
export function useApi() {
  const { token } = useAuth();

  // Wrapper for fetch with Authorization header
  const apiFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      ...options,
      headers,
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  };

  return { apiFetch };
}