// API base URL - uses Vite proxy in development, can be configured for production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Important: This sends cookies with the request
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text || 'An error occurred' };
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    // Provide more helpful error messages
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:5000');
    }
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  // Login user
  login: async (email, password) => {
    return apiRequest('/api/users/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Register user
  register: async (name, email, password) => {
    return apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  // Logout user
  logout: async () => {
    return apiRequest('/api/users/logout', {
      method: 'POST',
    });
  },

  // Get user profile
  getProfile: async () => {
    return apiRequest('/api/users/profile', {
      method: 'GET',
    });
  },

  // Update user profile
  updateProfile: async (userData) => {
    return apiRequest('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

export default apiRequest;
