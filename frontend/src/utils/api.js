// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/api/users/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name, email, password) => {
    return apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  logout: async () => {
    return apiRequest('/api/users/logout', {
      method: 'POST',
    });
  },

  getProfile: async () => {
    return apiRequest('/api/users/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (userData) => {
    return apiRequest('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Emission API calls
export const emissionAPI = {
  // Analyze image (base64)
  analyzeImage: async (imageData, imageName, location, notes) => {
    return apiRequest('/api/emissions/analyze', {
      method: 'POST',
      body: JSON.stringify({ 
        image: imageData, 
        imageName, 
        location, 
        notes 
      }),
    });
  },

  // Analyze image from URL
  analyzeImageUrl: async (imageUrl, imageName, location, notes) => {
    return apiRequest('/api/emissions/analyze-url', {
      method: 'POST',
      body: JSON.stringify({ 
        imageUrl, 
        imageName, 
        location, 
        notes 
      }),
    });
  },

  // Get all emissions
  getEmissions: async () => {
    return apiRequest('/api/emissions', {
      method: 'GET',
    });
  },

  // Get single emission
  getEmissionById: async (id) => {
    return apiRequest(`/api/emissions/${id}`, {
      method: 'GET',
    });
  },

  // Delete emission
  deleteEmission: async (id) => {
    return apiRequest(`/api/emissions/${id}`, {
      method: 'DELETE',
    });
  },

  // Get emission trends
  getEmissionTrends: async (startDate, endDate) => {
    let url = '/api/emissions/trends';
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (params.toString()) url += `?${params.toString()}`;

    return apiRequest(url, {
      method: 'GET',
    });
  },
};

export default apiRequest;
